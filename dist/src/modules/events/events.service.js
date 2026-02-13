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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let EventsService = class EventsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listEvents(query, userId) {
        if (!userId) {
            throw new common_1.BadRequestException('UserId is required');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { city: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const where = {
            city: user.city,
        };
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        if (query.category) {
            where.category = query.category;
        }
        if (query.search) {
            where.OR = [
                { title: { contains: query.search, mode: 'insensitive' } },
                { description: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        if (query.startDate || query.endDate) {
            where.startDate = {};
            if (query.startDate) {
                where.startDate.gte = new Date(query.startDate);
            }
            if (query.endDate) {
                where.startDate.lte = new Date(query.endDate);
            }
        }
        const [events, total] = await Promise.all([
            this.prisma.event.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { startDate: 'asc' },
            }),
            this.prisma.event.count({ where }),
        ]);
        const data = await Promise.all(events.map(async (event) => {
            const subscribersCount = await this.prisma.subscription.count({
                where: {
                    eventId: event.id,
                    cancelledAt: null,
                },
            });
            const isSubscribed = await this.prisma.subscription.findFirst({
                where: {
                    eventId: event.id,
                    userId: userId,
                    cancelledAt: null,
                },
                select: { id: true },
            });
            console.log({
                id: event.id,
                title: event.title,
                description: event.description,
                imageUrl: event.imageUrl,
                startDate: event.startDate,
                endDate: event.endDate,
                location: event.location,
                city: event.city,
                category: event.category,
                maxCapacity: event.maxCapacity,
                createdAt: event.createdAt,
                updatedAt: event.updatedAt,
                subscribersCount,
                isSubscribed: !!isSubscribed,
            });
            return {
                id: event.id,
                title: event.title,
                description: event.description,
                imageUrl: event.imageUrl,
                startDate: event.startDate,
                endDate: event.endDate,
                location: event.location,
                city: event.city,
                category: event.category,
                maxCapacity: event.maxCapacity,
                createdAt: event.createdAt,
                updatedAt: event.updatedAt,
                subscribersCount,
                isSubscribed: !!isSubscribed,
            };
        }));
        return {
            data,
            total,
            page,
            limit,
        };
    }
    async getEventById(eventId, userId) {
        if (!userId) {
            throw new common_1.BadRequestException('UserId is required');
        }
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        const subscribersCount = await this.prisma.subscription.count({
            where: {
                eventId: event.id,
                cancelledAt: null,
            },
        });
        const isSubscribed = await this.prisma.subscription.findFirst({
            where: {
                eventId: event.id,
                userId: userId,
                cancelledAt: null,
            },
            select: { id: true },
        });
        console.log({
            id: event.id,
            title: event.title,
            subscribersCount,
            isSubscribed: !!isSubscribed,
        });
        return {
            id: event.id,
            title: event.title,
            description: event.description,
            imageUrl: event.imageUrl,
            startDate: event.startDate,
            endDate: event.endDate,
            location: event.location,
            city: event.city,
            category: event.category,
            maxCapacity: event.maxCapacity,
            createdAt: event.createdAt,
            updatedAt: event.updatedAt,
            subscribersCount,
            isSubscribed: !!isSubscribed,
        };
    }
    async subscribe(eventId, userId) {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
            include: {
                _count: { select: { subscriptions: true } },
            },
        });
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        if (new Date() > event.startDate) {
            throw new common_1.BadRequestException('O evento já começou ou terminou.');
        }
        const activeSubs = await this.prisma.subscription.count({
            where: { eventId, cancelledAt: null },
        });
        if (activeSubs >= event.maxCapacity) {
            throw new common_1.BadRequestException('O evento está lotado.');
        }
        const existing = await this.prisma.subscription.findFirst({
            where: { eventId, userId },
        });
        if (existing) {
            if (!existing.cancelledAt) {
                throw new common_1.BadRequestException('Already subscribed');
            }
            await this.prisma.subscription.update({
                where: { id: existing.id },
                data: { cancelledAt: null },
            });
            return { message: 'Subscription reactivated' };
        }
        await this.prisma.subscription.create({
            data: { eventId, userId },
        });
        return { message: 'Subscribed successfully' };
    }
    async unsubscribe(eventId, userId) {
        const subscription = await this.prisma.subscription.findFirst({
            where: { eventId, userId, cancelledAt: null },
        });
        if (!subscription) {
            throw new common_1.NotFoundException('Subscription not found or already cancelled');
        }
        await this.prisma.subscription.update({
            where: { id: subscription.id },
            data: { cancelledAt: new Date() },
        });
        return { message: 'Subscription cancelled (soft delete)' };
    }
    async getUserEvents(userId) {
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
    async uploadImage(eventId, imageBase64) {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
        });
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        await this.prisma.event.update({
            where: { id: eventId },
            data: { imageUrl: imageBase64 },
        });
        return {
            message: 'Imagem salva',
            eventId,
        };
    }
    async createEvent(dto, userId) {
        const start = new Date(dto.startDate);
        const end = new Date(dto.endDate);
        if (end <= start) {
            throw new common_1.BadRequestException('EndDate deve ser maior que StartDate');
        }
        const event = await this.prisma.event.create({
            data: {
                ...dto,
                imageUrl: dto.imageUrl ?? null,
            },
        });
        return event;
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventsService);
//# sourceMappingURL=events.service.js.map