import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Jobs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('jobs')
export class JobsController {
  constructor(private jobs: JobsService) {}

  // ================================
  // Manual triggers (debug / admin)
  // ================================
  @Get('run/reminder')
  @ApiOperation({ summary: 'Run reminder job manually' })
  runReminder() {
    return this.jobs.reminderBeforeEvent();
  }

  @Get('run/new-event')
  @ApiOperation({ summary: 'Run new event job manually' })
  runNewEvent() {
    return this.jobs.newEventNotification();
  }

  @Get('run/capacity')
  @ApiOperation({ summary: 'Run capacity job manually' })
  runCapacity() {
    return this.jobs.capacityAlertJob();
  }

  // ================================
  // Logs
  // ================================
  @Get()
  @ApiOperation({ summary: 'Get all job logs' })
  getAll() {
    return this.jobs.getAllJobs();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job log by id' })
  getOne(@Param('id') id: string) {
    return this.jobs.getJobById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete job log' })
  delete(@Param('id') id: string) {
    return this.jobs.deleteJob(id);
  }
}
