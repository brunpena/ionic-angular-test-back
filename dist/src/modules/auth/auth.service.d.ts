import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: RegisterDto;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        token: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
}
