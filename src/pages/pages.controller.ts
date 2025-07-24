import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Patch,
  Body,
  UseGuards,
  Post,
  InternalServerErrorException,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateBlockDto } from './dto/update-block.dto';
import { exec } from 'child_process';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    const page = await this.pagesService.findBySlug(slug);
    if (!page) {
      throw new NotFoundException(`Página com slug "${slug}" não encontrada.`);
    }
    return page;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':pageId/blocks/:blockId')
  async updateBlock(
    @Param('pageId') pageId: string,
    @Param('blockId') blockId: string,
    @Body() updateBlockDto: UpdateBlockDto,
  ) {
    const updatedPage = await this.pagesService.updateBlock(pageId, blockId, updateBlockDto);
    if (!updatedPage) {
      throw new NotFoundException('Página ou Bloco não encontrado para atualização.');
    }
    return updatedPage.blocks.find((b) => String(b._id) === blockId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('publish/:slug')
  publishPage(@Param('slug') slug: string) {
    exec(`node ../scripts/build-page.js ${slug}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao publicar página ${slug}:`, stderr);
        throw new InternalServerErrorException('Falha ao publicar página.');
      }
      console.log(`Página ${slug} publicada com sucesso:`, stdout);
    });
    return { message: `Publicação da página '${slug}' iniciada.` };
  }
}
