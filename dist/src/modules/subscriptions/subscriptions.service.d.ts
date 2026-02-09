import { PrismaService } from 'prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
export declare class SubscriptionsService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllSubscriptions(): Promise<({
        user: {
            email: string;
            city: string;
            name: string;
            id: string;
            passwordHash: string;
            role: import(".prisma/client").$Enums.UserRole;
            createdAt: Date;
            updatedAt: Date;
        };
        event: {
            city: string;
            description: string;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            category: import(".prisma/client").$Enums.EventCategory;
            startDate: Date;
            endDate: Date;
            imageUrl: string | null;
            location: string;
            maxCapacity: number;
        };
    } & {
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        cancelledAt: Date | null;
        userId: string;
        eventId: string;
    })[]>;
    getSubscriptionById(id: string): Promise<{
        user: {
            email: string;
            city: string;
            name: string;
            id: string;
            passwordHash: string;
            role: import(".prisma/client").$Enums.UserRole;
            createdAt: Date;
            updatedAt: Date;
        };
        event: {
            city: string;
            description: string;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            category: import(".prisma/client").$Enums.EventCategory;
            startDate: Date;
            endDate: Date;
            imageUrl: string | null;
            location: string;
            maxCapacity: number;
        };
    } & {
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        cancelledAt: Date | null;
        userId: string;
        eventId: string;
    }>;
    createSubscription(dto: CreateSubscriptionDto): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        cancelledAt: Date | null;
        userId: string;
        eventId: string;
    }>;
    updateSubscription(id: string, dto: UpdateSubscriptionDto): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        cancelledAt: Date | null;
        userId: string;
        eventId: string;
    }>;
    deleteSubscription(id: string): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        cancelledAt: Date | null;
        userId: string;
        eventId: string;
    }>;
}
