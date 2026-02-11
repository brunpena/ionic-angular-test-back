import { PrismaService } from 'prisma/prisma.service';
export declare class EventsService {
    private prisma;
    constructor(prisma: PrismaService);
    listEvents(query: any): Promise<{
        data: {
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
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    getEventById(eventId: string): Promise<{
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
    }>;
    subscribe(eventId: string, userId: string): Promise<{
        message: string;
    }>;
    getUserEvents(userId: string): Promise<{
        upcoming: {
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
        }[];
        past: {
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
        }[];
    }>;
    uploadImage(eventId: string, imageBase64: string): Promise<{
        message: string;
        eventId: string;
    }>;
}
