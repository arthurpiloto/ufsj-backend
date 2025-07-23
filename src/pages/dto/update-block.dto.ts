import { IsNotEmpty, IsObject } from 'class-validator';
export class UpdateBlockDto {
  @IsObject()
  @IsNotEmpty()
  content: { text?: string; url?: string; alt?: string; link?: string };
}
