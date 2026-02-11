import { PrismaService } from 'prisma/prisma.service';
export declare class PushService {
    private prisma;
    private logger;
    constructor(prisma: PrismaService);
    private initFirebase;
    registerToken(userId: string, token: string, platform: 'web' | 'android' | 'ios'): Promise<{
        id: string;
        createdAt: Date;
        token: string;
        userId: string;
        platform: import(".prisma/client").$Enums.PushPlatform;
    }>;
    sendToUser(userId: string, notification: {
        title: string;
        body: string;
    }): Promise<void>;
    private send;
    unregisterToken(userId: string, token: string): Promise<{
        success: boolean;
    }>;
}
