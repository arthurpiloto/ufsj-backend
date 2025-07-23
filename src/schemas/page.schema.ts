import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BlockSchema, Block } from './block.schema';

@Schema({ timestamps: true })
export class Page extends Document {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop([BlockSchema])
  blocks: Block[];
}

export const PageSchema = SchemaFactory.createForClass(Page);
