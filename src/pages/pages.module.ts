import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { Page, PageSchema } from './schemas/page.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]), AuthModule],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
