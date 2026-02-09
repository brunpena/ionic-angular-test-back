import { Controller, Get, Post, Delete, Param, Query, Body, UseGuards, Req } from '@nestjs/common';
import { EventsService } from './events.service';
import { QueryEventsDto } from './dto/query-events.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadEventImageDto } from './dto/upload-event-image.dto';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async listEvents(@Query() queryEventsDto: QueryEventsDto) {
    return this.eventsService.listEvents(queryEventsDto);
  }

  @Get(':id')
  async getEvent(@Param('id') id: string) {
    return this.eventsService.getEventById(id);
  }

  @Post(':id/subscribe')
  @UseGuards(JwtAuthGuard)
  async subscribe(@Param('id') id: string, @Req() req: any) {
    return this.eventsService.subscribe(id, req.user.id);
  }

  @Delete(':id/subscribe')
  @UseGuards(JwtAuthGuard)
  async unsubscribe(@Param('id') id: string, @Req() req: any) {
    return this.eventsService.unsubscribe(id, req.user.id);
  }

  @Get('me/events')
  @UseGuards(JwtAuthGuard)
  async getUserEvents(@Req() req: any) {
    return this.eventsService.getUserEvents(req.user.id);
  }

  @Post(':id/image')
  @UseGuards(JwtAuthGuard)
  async uploadImage(@Param('id') id: string, @Body() uploadImageDto: UploadEventImageDto) {
    return this.eventsService.uploadImage(id, uploadImageDto.imageBase64);
  }
}
