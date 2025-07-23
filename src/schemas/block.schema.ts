import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: false })
class StyleOptions {
  @Prop()
  color: string;

  @Prop()
  fontSize: string;

  @Prop()
  textAlign: 'left' | 'center' | 'right';
}

@Schema({ timestamps: true })
export class Block extends Document {
  @Prop({ required: true, enum: ['heading', 'paragraph', 'image', 'button'] })
  type: string;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  content: {
    text?: string;
    url?: string;
    alt?: string;
    link?: string;
  };

  @Prop({ type: StyleOptions, default: {} })
  styles: StyleOptions;

  @Prop({ required: true })
  order: number;
}

export const BlockSchema = SchemaFactory.createForClass(Block);
