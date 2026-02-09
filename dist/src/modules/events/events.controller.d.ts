import { EventsService } from './events.service';
import { QueryEventsDto } from './dto/query-events.dto';
import { UploadEventImageDto } from './dto/upload-event-image.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    listEvents(queryEventsDto: QueryEventsDto): Promise<{
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
    getEvent(id: string): Promise<{
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
    subscribe(id: string, req: any): Promise<{
        message: string;
    }>;
    getUserEvents(req: any): Promise<{
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
    uploadImage(id: string, uploadImageDto: UploadEventImageDto): Promise<{
        message: string;
        eventId: string;
    }>;
}
