import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/authRegister.dto';
import { UsersService } from 'src/modules/users/users.service';
import { TokenBlacklistService } from 'src/modules/tokenBlackList/token-black-list.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {}

  // ======================
  // REGISTER
  // ======================
  async register(dto: RegisterDto) {
    const userExists = await this.usersService.findByEmail(dto.email);

    if (userExists) {
      throw new BadRequestException('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      passwordHash: hashedPassword,
      city: dto.city,
    });

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      token,
      user,
    };
  }

  // ======================
  // LOGIN
  // ======================
  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const passwordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      token,
      user,
    };
  }

  // ======================
  // LOGOUT
  // ======================
  async logout(token: string) {
    const decoded = this.jwtService.decode(token) as any;

    if (!decoded || !decoded.exp) {
      throw new UnauthorizedException('Token inválido');
    }

    await this.tokenBlacklistService.add(
      token,
      new Date(decoded.exp * 1000),
    );

    return { success: true };
  }
}
