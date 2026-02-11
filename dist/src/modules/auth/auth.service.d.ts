import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/authRegister.dto';
import { UsersService } from 'src/modules/users/users.service';
import { TokenBlacklistService } from 'src/modules/tokenBlackList/token-black-list.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly tokenBlacklistService;
    constructor(usersService: UsersService, jwtService: JwtService, tokenBlacklistService: TokenBlacklistService);
    register(dto: RegisterDto): Promise<{
        token: string;
        user: {
            email: string;
            name: string;
            city: string;
            id: string;
            passwordHash: string;
            role: import(".prisma/client").$Enums.UserRole;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            email: string;
            name: string;
            city: string;
            id: string;
            passwordHash: string;
            role: import(".prisma/client").$Enums.UserRole;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    logout(token: string): Promise<{
        success: boolean;
    }>;
}
