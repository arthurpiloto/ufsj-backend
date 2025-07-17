import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('processos')
export class ProcessosController {
  constructor() {}

  @Get()
  findAll() {}

  @Get(':slug')
  findOne(@Param('slug') _slug: string) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() _createProcessoDto: any) {}
}
