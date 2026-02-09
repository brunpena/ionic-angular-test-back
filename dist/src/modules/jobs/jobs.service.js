"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JobsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../../prisma/prisma.service");
const push_service_1 = require("../push/push.service");
let JobsService = JobsService_1 = class JobsService {
    prisma;
    push;
    logger = new common_1.Logger(JobsService_1.name);
    constructor(prisma, push) {
        this.prisma = prisma;
        this.push = push;
    }
    async reminderBeforeEvent() {
        const now = new Date();
        const startWindow = new Date(now.getTime() + 23.5 * 60 * 60 * 1000);
        const endWindow = new Date(now.getTime() + 24.5 * 60 * 60 * 1000);
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
            const alreadySent = await this.prisma.jobLog.findFirst({
                where: { jobName: 'REMINDER_24H', referenceId: event.id },
            });
            if (alreadySent)
                continue;
            for (const sub of event.subscriptions) {
                await this.push.sendToUser(sub.userId, {
                    title: 'Evento em breve!',
                    body: `${event.title} começa em menos de 24h`,
                });
                sent++;
            }
            await this.logJob('REMINDER_24H', event.id, event.subscriptions.length);
        }
        this.logger.log(`Reminder sent: ${sent}`);
    }
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
            const ratio = event._count.subscriptions / event.maxCapacity;
            if (ratio >= 0.8) {
                const alreadySent = await this.prisma.jobLog.findFirst({
                    where: { jobName: 'EVENT_80_PERCENT', referenceId: event.id },
                });
                if (alreadySent)
                    continue;
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
                await this.logJob('EVENT_80_PERCENT', event.id, sent);
            }
        }
        this.logger.log(`Capacity alerts sent: ${sent}`);
    }
    async logJob(jobName, referenceId, notificationsSent) {
        await this.prisma.jobLog.create({
            data: {
                jobName,
                referenceId,
                notificationsSent,
            },
        });
    }
    async getAllJobs() {
        return this.prisma.jobLog.findMany({
            orderBy: { executedAt: 'desc' },
        });
    }
    async getJobById(id) {
        return this.prisma.jobLog.findUnique({
            where: { id },
        });
    }
    async createJob(dto) {
        return this.prisma.jobLog.create({
            data: {
                jobName: dto.jobName,
                referenceId: dto.referenceId,
            },
        });
    }
    async updateJob(id, dto) {
        return this.prisma.jobLog.update({
            where: { id },
            data: dto,
        });
    }
    async deleteJob(id) {
        await this.prisma.jobLog.delete({
            where: { id },
        });
        return { message: 'Deleted', id };
    }
};
exports.JobsService = JobsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobsService.prototype, "reminderBeforeEvent", null);
__decorate([
    (0, schedule_1.Cron)('*/10 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobsService.prototype, "newEventNotification", null);
__decorate([
    (0, schedule_1.Cron)('*/30 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobsService.prototype, "capacityAlertJob", null);
exports.JobsService = JobsService = JobsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        push_service_1.PushService])
], JobsService);
//# sourceMappingURL=jobs.service.js.map