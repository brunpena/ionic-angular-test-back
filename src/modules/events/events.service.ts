import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { QueryEventsDto } from './dto/query-events.dto';
import { CreateEventDto } from './dto/create-event.dto';


@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  // LISTAR EVENTOS
  async listEvents(query: QueryEventsDto, userId: string) {
    if (!userId) {
      throw new BadRequestException('UserId is required');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { city: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const where: Prisma.EventWhereInput = {
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

    // 🔥 Buscar eventos primeiro
    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { startDate: 'asc' },
      }),
      this.prisma.event.count({ where }),
    ]);

    // 🔥 Agora montar os dados corretamente
    const data = await Promise.all(
      events.map(async (event) => {
        const subscribersCount = await this.prisma.subscription.count({
          where: {
            eventId: event.id,
            cancelledAt: null,
          },
        });

        // ✅ Verificar se o usuário está inscrito
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
      })
    );

    return {
      data,
      total,
      page,
      limit,
    };
  }




  // EVENTO POR ID
  async getEventById(eventId: string, userId: string) {

    if (!userId) {
      throw new BadRequestException('UserId is required');
    }

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // 🔥 Contar apenas inscrições ativas
    const subscribersCount = await this.prisma.subscription.count({
      where: {
        eventId: event.id,
        cancelledAt: null,
      },
    });

    // 🔥 Verificar se usuário está inscrito
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

  // INSCREVER
  async subscribe(eventId: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: {
        _count: { select: { subscriptions: true } },
      },
    });

    if (!event) throw new NotFoundException('Event not found');

    // Validar se o evento já aconteceu
    if (new Date() > event.startDate) {
      throw new BadRequestException('O evento já começou ou terminou.');
    }

    // Validar lotação máxima considerando apenas inscrições ativas
    const activeSubs = await this.prisma.subscription.count({
      where: { eventId, cancelledAt: null },
    });
    if (activeSubs >= event.maxCapacity) {
      throw new BadRequestException('O evento está lotado.');
    }

    // Verifica inscrição existente
    const existing = await this.prisma.subscription.findFirst({
      where: { eventId, userId },
    });

    if (existing) {
      if (!existing.cancelledAt) {
        throw new BadRequestException('Already subscribed');
      }

      // Reativa inscrição cancelada
      await this.prisma.subscription.update({
        where: { id: existing.id },
        data: { cancelledAt: null },
      });

      return { message: 'Subscription reactivated' };
    }

    // Cria nova inscrição
    await this.prisma.subscription.create({
      data: { eventId, userId },
    });

    return { message: 'Subscribed successfully' };
  }

  async unsubscribe(eventId: string, userId: string) {
    const subscription = await this.prisma.subscription.findFirst({
      where: { eventId, userId, cancelledAt: null },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found or already cancelled');
    }

    await this.prisma.subscription.update({
      where: { id: subscription.id },
      data: { cancelledAt: new Date() },
    });

    return { message: 'Subscription cancelled (soft delete)' };
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

  // CRIAR EVENTO
  async createEvent(dto: CreateEventDto, userId: string) {

    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);

    if (end <= start) {
      throw new BadRequestException(
        'EndDate deve ser maior que StartDate'
      );
    }

    const event = await this.prisma.event.create({
      data: {
        ...dto,
        imageUrl: dto.imageUrl ?? null,
      },
    });

    return event;
  }

}
