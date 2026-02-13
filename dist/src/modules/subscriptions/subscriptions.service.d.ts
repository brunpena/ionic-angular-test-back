import { PrismaService } from 'prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
export declare class SubscriptionsService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllSubscriptions(): Promise<({
        user: {
            id: string;
            createdAt: Date;
            name: string;
            email: string;
            passwordHash: string;
            city: string;
            role: import(".prisma/client").$Enums.UserRole;
            updatedAt: Date;
        };
        event: {
            id: string;
            createdAt: Date;
            city: string;
            updatedAt: Date;
            title: string;
            description: string;
            imageUrl: string | null;
            startDate: Date;
            endDate: Date;
            location: string;
            category: import(".prisma/client").$Enums.EventCategory;
            maxCapacity: number;
        };
    } & {
        id: string;
        userId: string;
        eventId: string;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        createdAt: Date;
        cancelledAt: Date | null;
    })[]>;
    getSubscriptionById(id: string): Promise<{
        user: {
            id: string;
            createdAt: Date;
            name: string;
            email: string;
            passwordHash: string;
            city: string;
            role: import(".prisma/client").$Enums.UserRole;
            updatedAt: Date;
        };
        event: {
            id: string;
            createdAt: Date;
            city: string;
            updatedAt: Date;
            title: string;
            description: string;
            imageUrl: string | null;
            startDate: Date;
            endDate: Date;
            location: string;
            category: import(".prisma/client").$Enums.EventCategory;
            maxCapacity: number;
        };
    } & {
        id: string;
        userId: string;
        eventId: string;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        createdAt: Date;
        cancelledAt: Date | null;
    }>;
    getPastSubscriptions(userId: string): Promise<({
        event: {
            subscriptions: {
                id: string;
                userId: string;
                eventId: string;
                status: import(".prisma/client").$Enums.SubscriptionStatus;
                createdAt: Date;
                cancelledAt: Date | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            city: string;
            updatedAt: Date;
            title: string;
            description: string;
            imageUrl: string | null;
            startDate: Date;
            endDate: Date;
            location: string;
            category: import(".prisma/client").$Enums.EventCategory;
            maxCapacity: number;
        };
    } & {
        id: string;
        userId: string;
        eventId: string;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        createdAt: Date;
        cancelledAt: Date | null;
    })[]>;
    createSubscription(dto: CreateSubscriptionDto): Promise<{
        id: string;
        userId: string;
        eventId: string;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        createdAt: Date;
        cancelledAt: Date | null;
    }>;
    updateSubscription(id: string, dto: UpdateSubscriptionDto): Promise<{
        id: string;
        userId: string;
        eventId: string;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        createdAt: Date;
        cancelledAt: Date | null;
    }>;
    getByUser(userId: string): Promise<({
        event: {
            id: string;
            createdAt: Date;
            city: string;
            updatedAt: Date;
            title: string;
            description: string;
            imageUrl: string | null;
            startDate: Date;
            endDate: Date;
            location: string;
            category: import(".prisma/client").$Enums.EventCategory;
            maxCapacity: number;
        };
    } & {
        id: string;
        userId: string;
        eventId: string;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        createdAt: Date;
        cancelledAt: Date | null;
    })[]>;
    cancelSubscription(id: string): Promise<{
        id: string;
        userId: string;
        eventId: string;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        createdAt: Date;
        cancelledAt: Date | null;
    }>;
}
