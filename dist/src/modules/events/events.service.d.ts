import { PrismaService } from 'prisma/prisma.service';
import { QueryEventsDto } from './dto/query-events.dto';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsService {
    private prisma;
    constructor(prisma: PrismaService);
    listEvents(query: QueryEventsDto, userId: string): Promise<{
        data: {
            id: string;
            title: string;
            description: string;
            imageUrl: string | null;
            startDate: Date;
            endDate: Date;
            location: string;
            city: string;
            category: import(".prisma/client").$Enums.EventCategory;
            maxCapacity: number;
            createdAt: Date;
            updatedAt: Date;
            subscribersCount: number;
            isSubscribed: boolean;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    getEventById(eventId: string, userId: string): Promise<{
        id: string;
        title: string;
        description: string;
        imageUrl: string | null;
        startDate: Date;
        endDate: Date;
        location: string;
        city: string;
        category: import(".prisma/client").$Enums.EventCategory;
        maxCapacity: number;
        createdAt: Date;
        updatedAt: Date;
        subscribersCount: number;
        isSubscribed: boolean;
    }>;
    subscribe(eventId: string, userId: string): Promise<{
        message: string;
    }>;
    unsubscribe(eventId: string, userId: string): Promise<{
        message: string;
    }>;
    getUserEvents(userId: string): Promise<{
        upcoming: {
            id: string;
            title: string;
            description: string;
            imageUrl: string | null;
            startDate: Date;
            endDate: Date;
            location: string;
            city: string;
            category: import(".prisma/client").$Enums.EventCategory;
            maxCapacity: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        past: {
            id: string;
            title: string;
            description: string;
            imageUrl: string | null;
            startDate: Date;
            endDate: Date;
            location: string;
            city: string;
            category: import(".prisma/client").$Enums.EventCategory;
            maxCapacity: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    uploadImage(eventId: string, imageBase64: string): Promise<{
        message: string;
        eventId: string;
    }>;
    createEvent(dto: CreateEventDto, userId: string): Promise<{
        id: string;
        title: string;
        description: string;
        imageUrl: string | null;
        startDate: Date;
        endDate: Date;
        location: string;
        city: string;
        category: import(".prisma/client").$Enums.EventCategory;
        maxCapacity: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
