import { Controller, Get, Patch, Body, UseGuards, Req, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserRegisterDto } from './dto/usersRegister.dto';
import { LoginDto } from './dto/login.dto';
  

@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get('me')
  getMe(@Req() req) {
    return this.usersService.findById(req.user.id)
  }

  @Patch('me')
  update(
    @Req() req,
    @Body() dto: UpdateUserDto
  ) {
    return this.usersService.update(req.user.id, dto)
  }

  @Post()
  create(
    @Body() dto: UserRegisterDto
  ) {
    return this.usersService.create(dto)
  }
} 
