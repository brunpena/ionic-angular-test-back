import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';

import { EventsService } from './events.service';
import { QueryEventsDto } from './dto/query-events.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadEventImageDto } from './dto/upload-event-image.dto';
import { CreateEventDto } from './dto/create-event.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Delete(':id/subscribe')
  async unsubscribe(@Param('id') id: string, @Req() req: any) {
    return this.eventsService.unsubscribe(id, req.user.userId);
  }

  // 🔥 IMPORTANTE — vem antes do :id
  @Get('me/events')
  async getUserEvents(@Req() req: any) {
    return this.eventsService.getUserEvents(req.user.userId);
  }

  // ✅ NOVO ENDPOINT CREATE
  @Post()
  async createEvent(
    @Body() dto: CreateEventDto,
    @Req() req: any
  ) {
    return this.eventsService.createEvent(dto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listEvents(
    @Query() query: QueryEventsDto,
    @Req() req: any
  ) {
    console.log('USER:', req.user);
    return this.eventsService.listEvents(query, req.user?.userId);
  }


  @Get(':id')
  async getEvent(@Param('id') id: string, @Req() req: any) {
    return this.eventsService.getEventById(id, req.user.userId);
  }

  @Post(':id/subscribe')
  async subscribe(@Param('id') id: string, @Req() req: any) {
    return this.eventsService.subscribe(id, req.user.userId);
  }

  @Post(':id/image')
  async uploadImage(
    @Param('id') id: string,
    @Body() uploadImageDto: UploadEventImageDto
  ) {
    return this.eventsService.uploadImage(id, uploadImageDto.imageBase64);
  }
}
