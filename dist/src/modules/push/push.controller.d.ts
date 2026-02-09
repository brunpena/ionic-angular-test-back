import { PushService } from './push.service';
declare class RegisterPushDto {
    token: string;
    platform: 'web' | 'android' | 'ios';
}
export declare class PushController {
    private push;
    constructor(push: PushService);
    register(req: any, dto: RegisterPushDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        token: string;
        platform: import(".prisma/client").$Enums.PushPlatform;
    }>;
}
export {};
