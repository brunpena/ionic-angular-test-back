import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        city: string;
        name: string;
        id: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
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
