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
    async listEvents(query) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const where = {};
        if (query.city)
            where.city = query.city;
        if (query.category)
            where.category = query.category;
        if (query.search) {
            where.OR = [
                { title: { contains: query.search, mode: 'insensitive' } },
                { description: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        if (query.startDate || query.endDate) {
            where.startDate = {};
            if (query.startDate)
                where.startDate.gte = new Date(query.startDate);
            if (query.endDate)
                where.startDate.lte = new Date(query.endDate);
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
    async getEventById(eventId) {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        return event;
    }
    async subscribe(eventId, userId) {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
            include: {
                _count: {
                    select: { subscriptions: true },
                },
            },
        });
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        if (new Date() > event.startDate) {
            throw new common_1.BadRequestException('O evento já começou ou terminou.');
        }
        if (event._count.subscriptions >= event.maxCapacity) {
            throw new common_1.BadRequestException('O evento está lotado.');
        }
        try {
            await this.prisma.subscription.create({
                data: {
                    eventId,
                    userId,
                },
            });
            return { message: 'Subscribed successfully' };
        }
        catch {
            throw new common_1.BadRequestException('Already subscribed');
        }
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
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventsService);
//# sourceMappingURL=events.service.js.map