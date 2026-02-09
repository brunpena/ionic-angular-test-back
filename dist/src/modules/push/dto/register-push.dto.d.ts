export declare enum PushPlatform {
    web = "web",
    android = "android",
    ios = "ios"
}
export declare class RegisterPushDto {
    token: string;
    platform: PushPlatform;
}
