import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: RegisterDto;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        token: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
}
