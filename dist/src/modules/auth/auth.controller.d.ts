import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/authRegister.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
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
    login(loginDto: LoginDto): Promise<{
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
    logout(req: any): Promise<{
        success: boolean;
    }>;
}
