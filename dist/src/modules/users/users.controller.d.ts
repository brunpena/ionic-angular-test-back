import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRegisterDto } from './dto/usersRegister.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMe(req: any): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        name: string;
        city: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(req: any, dto: UpdateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        name: string;
        passwordHash: string;
        city: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    create(dto: UserRegisterDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        name: string;
        passwordHash: string;
        city: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
