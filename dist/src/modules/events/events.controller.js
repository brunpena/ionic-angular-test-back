"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const events_service_1 = require("./events.service");
const query_events_dto_1 = require("./dto/query-events.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const upload_event_image_dto_1 = require("./dto/upload-event-image.dto");
const create_event_dto_1 = require("./dto/create-event.dto");
let EventsController = class EventsController {
    eventsService;
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    async unsubscribe(id, req) {
        return this.eventsService.unsubscribe(id, req.user.userId);
    }
    async getUserEvents(req) {
        return this.eventsService.getUserEvents(req.user.userId);
    }
    async createEvent(dto, req) {
        return this.eventsService.createEvent(dto, req.user.userId);
    }
    async listEvents(query, req) {
        console.log('USER:', req.user);
        return this.eventsService.listEvents(query, req.user?.userId);
    }
    async getEvent(id, req) {
        return this.eventsService.getEventById(id, req.user.userId);
    }
    async subscribe(id, req) {
        return this.eventsService.subscribe(id, req.user.userId);
    }
    async uploadImage(id, uploadImageDto) {
        return this.eventsService.uploadImage(id, uploadImageDto.imageBase64);
    }
};
exports.EventsController = EventsController;
__decorate([
    (0, common_1.Delete)(':id/subscribe'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "unsubscribe", null);
__decorate([
    (0, common_1.Get)('me/events'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getUserEvents", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "createEvent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_events_dto_1.QueryEventsDto, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "listEvents", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getEvent", null);
__decorate([
    (0, common_1.Post)(':id/subscribe'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "subscribe", null);
__decorate([
    (0, common_1.Post)(':id/image'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, upload_event_image_dto_1.UploadEventImageDto]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "uploadImage", null);
exports.EventsController = EventsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/events'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
//# sourceMappingURL=events.controller.js.map