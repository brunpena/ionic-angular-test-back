import { EventCategoryDto } from './enum-category.dto';
export declare class CreateEventDto {
    title: string;
    description: string;
    imageUrl: string;
    startDate: string;
    endDate: string;
    location: string;
    city: string;
    category: EventCategoryDto;
    maxCapacity: number;
}
