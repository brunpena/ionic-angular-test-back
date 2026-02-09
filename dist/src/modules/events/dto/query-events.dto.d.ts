import { EventCategoryDto } from './enum-category.dto';
export declare class QueryEventsDto {
    city?: string;
    search?: string;
    category?: EventCategoryDto;
    startDate?: string;
    endDate?: string;
    page: number;
    limit: number;
}
