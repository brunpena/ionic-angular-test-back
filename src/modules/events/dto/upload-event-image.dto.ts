import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UploadEventImageDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^data:image\/(jpeg|png|gif|bmp|webp);base64,/, {
    message: 'A imagem deve estar no formato Base64 válido (ex: data:image/png;base64,...)',
  })
  imageBase64: string;
}