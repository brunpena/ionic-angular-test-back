import { TokenBlacklistService } from './token-black-list.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { TokenStatusDto } from './dto/token-response.dto';
export declare class TokenBlacklistController {
    private readonly service;
    constructor(service: TokenBlacklistService);
    add(dto: CreateTokenDto): Promise<{
        id: string;
        createdAt: Date;
        token: string;
        expiresAt: Date;
    }>;
    check(token: string): Promise<TokenStatusDto>;
    remove(token: string): Promise<{
        id: string;
        createdAt: Date;
        token: string;
        expiresAt: Date;
    }>;
    list(): Promise<{
        id: string;
        createdAt: Date;
        token: string;
        expiresAt: Date;
    }[]>;
    clearExpired(): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
