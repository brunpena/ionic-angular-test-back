import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { QueryEventsDto } from './dto/query-events.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  // LISTAR EVENTOS
  async listEvents(query: any) { // Altere QueryEventsDto para incluir search, startDate, endDate
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const where: any = {};

    if (query.city) where.city = query.city;
    if (query.category) where.category = query.category;

    // 1. Busca textual (Título ou Descrição)
    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    // 2. Filtro por intervalo de datas
    if (query.startDate || query.endDate) {
      where.startDate = {};
      if (query.startDate) where.startDate.gte = new Date(query.startDate);
      if (query.endDate) where.startDate.lte = new Date(query.endDate);
    }

    const [data, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { startDate: 'asc' },
      }),
      this.prisma.event.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  // EVENTO POR ID
  async getEventById(eventId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  // INSCREVER
  async subscribe(eventId: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: {
        _count: {
          select: { subscriptions: true },
        },
      },
    });

    if (!event) throw new NotFoundException('Event not found');

    // 1. Validar se o evento já aconteceu
    if (new Date() > event.startDate) {
      throw new BadRequestException('O evento já começou ou terminou.');
    }

    // 2. Validar lotação máxima
    if (event._count.subscriptions >= event.maxCapacity) {
      throw new BadRequestException('O evento está lotado.');
    }

    try {
      await this.prisma.subscription.create({
        data: {
          eventId,
          userId,
        },
      });

      return { message: 'Subscribed successfully' };
    } catch {
      throw new BadRequestException('Already subscribed');
    }
  }

  // DESINSCREVER
  async unsubscribe(eventId: string, userId: string) {
    const sub = await this.prisma.subscription.findFirst({
      where: { eventId, userId },
    });

    if (!sub) throw new NotFoundException('Subscription not found');

    await this.prisma.subscription.update({
      where: { id: sub.id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
      },
    });

    return { message: 'Unsubscribed successfully' };
  }

  // EVENTOS DO USUÁRIO
  async getUserEvents(userId: string) {
    const now = new Date();

    const subs = await this.prisma.subscription.findMany({
      where: {
        userId,
        status: 'ACTIVE',
      },
      include: { event: true },
    });

    const upcoming = subs
      .filter((s) => s.event.startDate >= now)
      .map((s) => s.event);

    const past = subs
      .filter((s) => s.event.startDate < now)
      .map((s) => s.event);

    return { upcoming, past };
  }

  // UPLOAD DE IMAGEM (placeholder seguro)
  async uploadImage(eventId: string, imageBase64: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) throw new NotFoundException('Event not found');

    // Aqui seria integração com storage (S3/GCS/etc)
    // Por enquanto só salva a string

    await this.prisma.event.update({
      where: { id: eventId },
      data: { imageUrl: imageBase64 },
    });

    return {
      message: 'Imagem salva',
      eventId,
    };
  }
}
