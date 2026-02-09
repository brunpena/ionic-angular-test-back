import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  // ============================================
  // GET ALL
  // ============================================
  async getAllSubscriptions() {
    return this.prisma.subscription.findMany({
      include: {
        user: true,
        event: true,
      },
    });
  }

  // ============================================
  // GET ONE
  // ============================================
  async getSubscriptionById(id: string) {
    const sub = await this.prisma.subscription.findUnique({
      where: { id },
      include: { user: true, event: true },
    });

    if (!sub) throw new NotFoundException('Subscription not found');

    return sub;
  }

  // ============================================
  // CREATE
  // ============================================
  async createSubscription(dto: CreateSubscriptionDto) {
    // Verifica evento
    const event = await this.prisma.event.findUnique({
      where: { id: dto.eventId },
      include: {
        subscriptions: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    if (!event)
      throw new NotFoundException('Event not found');

    // Evento já começou
    if (event.startDate < new Date())
      throw new BadRequestException('Event already started');

    // Lotação
    if (event.subscriptions.length >= event.maxCapacity)
      throw new BadRequestException('Event is full');

    // Duplicado
    const existing = await this.prisma.subscription.findUnique({
      where: {
        userId_eventId: {
          userId: dto.userId,
          eventId: dto.eventId,
        },
      },
    });

    if (existing && existing.status === 'ACTIVE')
      throw new BadRequestException('Already subscribed');

    // Criar
    return this.prisma.subscription.create({
      data: {
        userId: dto.userId,
        eventId: dto.eventId,
      },
    });
  }

  // ============================================
  // UPDATE
  // ============================================
  async updateSubscription(
    id: string,
    dto: UpdateSubscriptionDto,
  ) {
    const sub = await this.prisma.subscription.findUnique({
      where: { id },
    });

    if (!sub)
      throw new NotFoundException('Subscription not found');

    return this.prisma.subscription.update({
      where: { id },
      data: dto,
    });
  }

  // ============================================
  // DELETE (Cancel — não remove)
  // ============================================
  async deleteSubscription(id: string) {
    const sub = await this.prisma.subscription.findUnique({
      where: { id },
    });

    if (!sub)
      throw new NotFoundException('Subscription not found');

    return this.prisma.subscription.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
      },
    });
  }
}
