import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from './schemas/page.schema';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(@InjectModel(Page.name) private pageModel: Model<Page>) {}

  async findAllSlugs(): Promise<{ slug: string }[]> {
    return this.pageModel.find().select('slug').exec();
  }

  async findBySlug(slug: string): Promise<Page> {
    const page = await this.pageModel.findOne({ slug }).exec();
    if (!page) {
      throw new NotFoundException(`Página com slug "${slug}" não encontrada.`);
    }
    return page;
  }

  async create(createPageDto: CreatePageDto): Promise<Page> {
    const createdPage = new this.pageModel(createPageDto);
    return createdPage.save();
  }

  async findAllForCms(): Promise<Page[]> {
    return this.pageModel.find().exec();
  }

  async findById(id: string): Promise<Page> {
    const page = await this.pageModel.findById(id).exec();
    if (!page) {
      throw new NotFoundException(`Página com ID "${id}" não encontrada.`);
    }
    return page;
  }

  async update(id: string, updatePageDto: UpdatePageDto): Promise<Page> {
    const updatedPage = await this.pageModel
      .findByIdAndUpdate(id, updatePageDto, { new: true })
      .exec();
    if (!updatedPage) {
      throw new NotFoundException(`Página com ID "${id}" não encontrada para atualização.`);
    }
    return updatedPage;
  }

  async remove(id: string): Promise<{ deleted: boolean; id: string }> {
    const result = await this.pageModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Página com ID "${id}" não encontrada para exclusão.`);
    }
    return { deleted: true, id };
  }
}
