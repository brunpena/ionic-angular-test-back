"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const events_module_1 = require("./modules/events/events.module");
const subscriptions_module_1 = require("./modules/subscriptions/subscriptions.module");
const push_module_1 = require("./modules/push/push.module");
const jobs_module_1 = require("./modules/jobs/jobs.module");
const prisma_module_1 = require("../prisma/prisma.module");
const throttler_1 = require("@nestjs/throttler");
const constants_1 = require("@nestjs/core/constants");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: constants_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [
                    { ttl: 60, limit: 20 },
                    { ttl: 10, limit: 3 },
                ],
            }),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            events_module_1.EventsModule,
            subscriptions_module_1.SubscriptionsModule,
            push_module_1.PushModule,
            jobs_module_1.JobsModule,
            prisma_module_1.PrismaModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map