import { EventsService } from './events.service';
import { QueryEventsDto } from './dto/query-events.dto';
import { UploadEventImageDto } from './dto/upload-event-image.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    listEvents(queryEventsDto: QueryEventsDto): Promise<{
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
    getEvent(id: string): Promise<{
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
    subscribe(id: string, req: any): Promise<{
        message: string;
    }>;
    unsubscribe(id: string, req: any): Promise<{
        message: string;
    }>;
    getUserEvents(req: any): Promise<{
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
    uploadImage(id: string, uploadImageDto: UploadEventImageDto): Promise<{
        message: string;
        eventId: string;
    }>;
}
