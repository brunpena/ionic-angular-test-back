import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsDateString,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator'
import { EventCategoryDto } from './enum-category.dto'

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsString()
  imageUrl: string

  @ApiProperty()
  @IsDateString()
  startDate: string

  @ApiProperty()
  @IsDateString()
  endDate: string

  @ApiProperty()
  @IsString()
  location: string

  @ApiProperty()
  @IsString()
  city: string

  @ApiProperty({ enum: EventCategoryDto })
  @IsEnum(EventCategoryDto)
  category: EventCategoryDto

  @ApiProperty()
  @IsInt()
  @Min(1)
  maxCapacity: number
}
  