import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'prisma/prisma.service';
import { PushService } from '../push/push.service';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    private prisma: PrismaService,
    private push: PushService,
  ) {}

  // =========================================================
  // 1️⃣ REMINDER 24H
  // roda a cada hora
  // =========================================================
  @Cron(CronExpression.EVERY_HOUR)
  async reminderBeforeEvent() {
    const now = new Date();
    const startWindow = new Date(now.getTime() + 23.5 * 60 * 60 * 1000); // 23.5h daqui
    const endWindow = new Date(now.getTime() + 24.5 * 60 * 60 * 1000);   // 24.5h daqui

    const events = await this.prisma.event.findMany({
      where: {
        startDate: {
          gte: startWindow,
          lte: endWindow,
        },
      },
      include: {
        subscriptions: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    let sent = 0;

    for (const event of events) {
      // Verifica se já enviamos lembrete para este evento
      const alreadySent = await this.prisma.jobLog.findFirst({
        where: { jobName: 'REMINDER_24H', referenceId: event.id },
      });

      if (alreadySent) continue;

      for (const sub of event.subscriptions) {
        await this.push.sendToUser(sub.userId, {
          title: 'Evento em breve!',
          body: `${event.title} começa em menos de 24h`,
        });
        sent++;
      }
      // Loga por evento para evitar duplicidade
      await this.logJob('REMINDER_24H', event.id, event.subscriptions.length);
    }

    this.logger.log(`Reminder sent: ${sent}`);
  }

  // =========================================================
  // 2️⃣ NOVO EVENTO NA CIDADE
  // roda a cada 10 min
  // =========================================================
  @Cron('*/10 * * * *')
  async newEventNotification() {
    const lastRun = new Date(Date.now() - 10 * 60 * 1000);

    const events = await this.prisma.event.findMany({
      where: {
        createdAt: { gte: lastRun },
      },
    });

    let sent = 0;

    for (const event of events) {
      const users = await this.prisma.user.findMany({
        where: { city: event.city },
        select: { id: true },
      });

      for (const user of users) {
        await this.push.sendToUser(user.id, {
          title: 'Novo evento na sua cidade!',
          body: event.title,
        });
        sent++;
      }
    }

    await this.logJob('NEW_EVENT_CITY', null, sent);
    this.logger.log(`City notifications sent: ${sent}`);
  }

  // =========================================================
  // 3️⃣ EVENTO 80% LOTADO
  // roda a cada 30 min
  // =========================================================
  @Cron('*/30 * * * *')
  async capacityAlertJob() {
    const events = await this.prisma.event.findMany({
      include: {
        _count: {
          select: { subscriptions: true },
        },
      },
    });

    let sent = 0;

    for (const event of events) {
      const ratio =
        event._count.subscriptions / event.maxCapacity;

      if (ratio >= 0.8) {
        // Verifica se já enviamos alerta de lotação para este evento
        const alreadySent = await this.prisma.jobLog.findFirst({
          where: { jobName: 'EVENT_80_PERCENT', referenceId: event.id },
        });

        if (alreadySent) continue;

        const users = await this.prisma.user.findMany({
          where: { city: event.city },
          select: { id: true },
        });

        for (const user of users) {
          await this.push.sendToUser(user.id, {
            title: 'Quase lotado!',
            body: `${event.title} está quase cheio`,
          });
          sent++;
        }
        // Marca que o alerta foi enviado para este evento
        await this.logJob('EVENT_80_PERCENT', event.id, sent);
      }
    }

    this.logger.log(`Capacity alerts sent: ${sent}`);
  }

  // =========================================================
  // LOG CENTRALIZADO
  // =========================================================
  private async logJob(
    jobName: any,
    referenceId: string | null,
    notificationsSent: number,
  ) {
    await this.prisma.jobLog.create({
      data: {
        jobName,
        referenceId,
        notificationsSent,
      },
    });
  }

  // =========================================================
  // CRUD (para painel admin)
  // =========================================================
  async getAllJobs() {
    return this.prisma.jobLog.findMany({
      orderBy: { executedAt: 'desc' },
    });
  }

  async getJobById(id: string) {
    return this.prisma.jobLog.findUnique({
      where: { id },
    });
  }

  async createJob(dto: any) {
    return this.prisma.jobLog.create({
      data: {
        jobName: dto.jobName,
        referenceId: dto.referenceId,
      },
    });
  }

  async updateJob(id: string, dto: any) {
    return this.prisma.jobLog.update({
      where: { id },
      data: dto,
    });
  }

  async deleteJob(id: string) {
    await this.prisma.jobLog.delete({
      where: { id },
    });

    return { message: 'Deleted', id };
  }
}
