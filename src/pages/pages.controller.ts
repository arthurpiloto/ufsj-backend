import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get('pages/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.pagesService.findBySlug(slug);
  }

  @Get('pages-slugs')
  findAllSlugs() {
    return this.pagesService.findAllSlugs();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('cms/pages')
  create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('cms/pages')
  findAllForCms() {
    return this.pagesService.findAllForCms();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('cms/pages/:id')
  findById(@Param('id') id: string) {
    return this.pagesService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('cms/pages/:id')
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pagesService.update(id, updatePageDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('cms/pages/:id')
  remove(@Param('id') id: string) {
    return this.pagesService.remove(id);
  }
}
