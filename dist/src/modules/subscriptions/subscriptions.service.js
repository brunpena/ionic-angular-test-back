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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let SubscriptionsService = class SubscriptionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllSubscriptions() {
        return this.prisma.subscription.findMany({
            where: {
                cancelledAt: null,
            },
            include: {
                user: true,
                event: true,
            },
        });
    }
    async getSubscriptionById(id) {
        const sub = await this.prisma.subscription.findUnique({
            where: { id },
            include: { user: true, event: true },
        });
        if (!sub)
            throw new common_1.NotFoundException('Subscription not found');
        return sub;
    }
    async getPastSubscriptions(userId) {
        return this.prisma.subscription.findMany({
            where: {
                userId,
                cancelledAt: { not: null },
            },
            include: {
                event: {
                    include: {
                        subscriptions: {
                            where: { status: 'ACTIVE' },
                        },
                    },
                },
            },
        });
    }
    async createSubscription(dto) {
        const event = await this.prisma.event.findUnique({
            where: { id: dto.eventId },
            include: {
                subscriptions: {
                    where: { status: 'ACTIVE' },
                },
            },
        });
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        if (event.startDate < new Date())
            throw new common_1.BadRequestException('Event already started');
        if (event.subscriptions.length >= event.maxCapacity)
            throw new common_1.BadRequestException('Event is full');
        const existing = await this.prisma.subscription.findUnique({
            where: {
                userId_eventId: {
                    userId: dto.userId,
                    eventId: dto.eventId,
                },
            },
        });
        if (existing) {
            if (existing.status === 'ACTIVE')
                throw new common_1.BadRequestException('Already subscribed');
            return this.prisma.subscription.update({
                where: { id: existing.id },
                data: {
                    status: 'ACTIVE',
                    cancelledAt: null,
                },
            });
        }
        return this.prisma.subscription.create({
            data: {
                userId: dto.userId,
                eventId: dto.eventId,
            },
        });
    }
    async updateSubscription(id, dto) {
        const sub = await this.prisma.subscription.findUnique({
            where: { id },
        });
        if (!sub)
            throw new common_1.NotFoundException('Subscription not found');
        return this.prisma.subscription.update({
            where: { id },
            data: dto,
        });
    }
    async getByUser(userId) {
        return this.prisma.subscription.findMany({
            where: {
                userId,
                cancelledAt: null,
            },
            include: {
                event: true,
            },
        });
    }
    async cancelSubscription(id) {
        const sub = await this.prisma.subscription.findUnique({
            where: { id },
        });
        if (!sub) {
            throw new common_1.NotFoundException('Subscription not found');
        }
        if (sub.status === client_1.SubscriptionStatus.CANCELLED) {
            throw new common_1.BadRequestException('Subscription already cancelled');
        }
        return this.prisma.subscription.update({
            where: { id },
            data: {
                status: client_1.SubscriptionStatus.CANCELLED,
                cancelledAt: new Date(),
            },
        });
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map