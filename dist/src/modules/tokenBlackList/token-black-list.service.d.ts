import { PrismaService } from 'prisma/prisma.service';
export declare class TokenBlacklistService {
    private prisma;
    constructor(prisma: PrismaService);
    add(token: string, expiresAt: Date): Promise<{
        id: string;
        createdAt: Date;
        token: string;
        expiresAt: Date;
    }>;
    isBlacklisted(token: string): Promise<boolean>;
    remove(token: string): Promise<{
        id: string;
        createdAt: Date;
        token: string;
        expiresAt: Date;
    }>;
    listAll(): Promise<{
        id: string;
        createdAt: Date;
        token: string;
        expiresAt: Date;
    }[]>;
    clearExpired(): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
