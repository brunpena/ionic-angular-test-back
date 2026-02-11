import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenBlacklistService } from 'src/modules/tokenBlackList/token-black-list.service';
import { Request } from 'express';
interface JwtPayload {
    sub: number;
    email: string;
    exp: number;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly blacklist;
    constructor(config: ConfigService, blacklist: TokenBlacklistService);
    validate(req: Request, payload: JwtPayload): Promise<{
        userId: number;
        email: string;
    }>;
}
export {};
