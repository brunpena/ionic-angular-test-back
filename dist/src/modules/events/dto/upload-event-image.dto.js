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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadEventImageDto = void 0;
const class_validator_1 = require("class-validator");
class UploadEventImageDto {
    imageBase64;
}
exports.UploadEventImageDto = UploadEventImageDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^data:image\/(jpeg|png|gif|bmp|webp);base64,/, {
        message: 'A imagem deve estar no formato Base64 válido (ex: data:image/png;base64,...)',
    }),
    __metadata("design:type", String)
], UploadEventImageDto.prototype, "imageBase64", void 0);
//# sourceMappingURL=upload-event-image.dto.js.map