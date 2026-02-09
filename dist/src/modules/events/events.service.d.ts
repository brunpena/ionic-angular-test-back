import { PrismaService } from 'prisma/prisma.service';
export declare class EventsService {
    private prisma;
    constructor(prisma: PrismaService);
    listEvents(query: any): Promise<{
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
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    getEventById(eventId: string): Promise<{
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
    subscribe(eventId: string, userId: string): Promise<{
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
}
