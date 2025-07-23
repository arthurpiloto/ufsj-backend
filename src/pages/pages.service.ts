import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from '../schemas/page.schema';
import { UpdateBlockDto } from './dto/update-block.dto';

@Injectable()
export class PagesService {
  constructor(@InjectModel(Page.name) private pageModel: Model<Page>) {}

  async findBySlug(slug: string): Promise<Page | null> {
    return this.pageModel.findOne({ slug }).exec();
  }

  async updateBlock(
    pageId: string,
    blockId: string,
    updateBlockDto: UpdateBlockDto,
  ): Promise<Page | null> {
    return this.pageModel.findOneAndUpdate(
      { _id: pageId, 'blocks._id': blockId },
      { $set: { 'blocks.$.content': updateBlockDto.content } },
      { new: true },
    );
  }
}
