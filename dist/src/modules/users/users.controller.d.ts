import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMe(req: any): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        city: string;
        name: string;
        id: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(req: any, dto: UpdateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        city: string;
        name: string;
        id: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
