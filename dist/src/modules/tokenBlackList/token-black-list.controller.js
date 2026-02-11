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
exports.TokenBlacklistController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const token_black_list_service_1 = require("./token-black-list.service");
const create_token_dto_1 = require("./dto/create-token.dto");
const token_response_dto_1 = require("./dto/token-response.dto");
let TokenBlacklistController = class TokenBlacklistController {
    service;
    constructor(service) {
        this.service = service;
    }
    async add(dto) {
        return this.service.add(dto.token, new Date(dto.expiresAt));
    }
    async check(token) {
        const blacklisted = await this.service.isBlacklisted(token);
        return { token, blacklisted };
    }
    async remove(token) {
        return this.service.remove(token);
    }
    async list() {
        return this.service.listAll();
    }
    async clearExpired() {
        return this.service.clearExpired();
    }
};
exports.TokenBlacklistController = TokenBlacklistController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Adicionar token à blacklist' }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_token_dto_1.CreateTokenDto]),
    __metadata("design:returntype", Promise)
], TokenBlacklistController.prototype, "add", null);
__decorate([
    (0, common_1.Get)(':token'),
    (0, swagger_1.ApiOperation)({ summary: 'Verificar se token está blacklistado' }),
    (0, swagger_1.ApiParam)({ name: 'token' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: token_response_dto_1.TokenStatusDto,
    }),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TokenBlacklistController.prototype, "check", null);
__decorate([
    (0, common_1.Delete)(':token'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover token da blacklist' }),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TokenBlacklistController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar tokens blacklistados' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TokenBlacklistController.prototype, "list", null);
__decorate([
    (0, common_1.Delete)('clear/expired'),
    (0, swagger_1.ApiOperation)({ summary: 'Limpar tokens expirados' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TokenBlacklistController.prototype, "clearExpired", null);
exports.TokenBlacklistController = TokenBlacklistController = __decorate([
    (0, swagger_1.ApiTags)('Token Blacklist'),
    (0, common_1.Controller)('token-blacklist'),
    __metadata("design:paramtypes", [token_black_list_service_1.TokenBlacklistService])
], TokenBlacklistController);
//# sourceMappingURL=token-black-list.controller.js.map