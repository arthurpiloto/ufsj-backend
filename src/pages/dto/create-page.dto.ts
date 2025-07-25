import { IsNotEmpty, IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

// DTOs aninhados são importantes para validar a estrutura interna dos dados.
class AnnexDto {
  @IsString() @IsNotEmpty() title: string;
  @IsString() @IsNotEmpty() url: string;
  @IsOptional() @IsString() description?: string;
}

class PageDocumentDto {
  @IsString() @IsNotEmpty() title: string;
  @IsString() @IsNotEmpty() url: string;
  @IsOptional() @IsString() description?: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnnexDto)
  @IsOptional()
  annexes?: AnnexDto[];
}

class SectionDto {
  @IsString() @IsNotEmpty() type: string;
  @IsString() @IsNotEmpty() title: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PageDocumentDto)
  @IsOptional()
  documents?: PageDocumentDto[];
  @IsArray() @IsOptional() items?: any[];
}

export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionDto)
  @IsOptional()
  sections?: SectionDto[];
}
