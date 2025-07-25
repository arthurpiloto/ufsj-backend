import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: true, versionKey: false })
export class Annex {
  _id: Types.ObjectId;
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) url: string;
  @Prop() description: string;
}
export const AnnexSchema = SchemaFactory.createForClass(Annex);

@Schema({ _id: true, versionKey: false })
export class PageDocument {
  _id: Types.ObjectId;
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) url: string;
  @Prop() description: string;
  @Prop({ type: [AnnexSchema], default: [] }) annexes: Annex[];
}
export const PageDocumentSchema = SchemaFactory.createForClass(PageDocument);

@Schema({ _id: true, versionKey: false })
export class Section {
  _id: Types.ObjectId;
  @Prop({ required: true }) type: string;
  @Prop({ required: true }) title: string;
  @Prop({ type: [PageDocumentSchema], default: [] }) documents: PageDocument[];
  @Prop({ type: [Object], default: [] }) items: Record<string, any>[];
}
export const SectionSchema = SchemaFactory.createForClass(Section);

@Schema({ timestamps: true, versionKey: false })
export class Page extends Document {
  @Prop({ required: true, unique: true, index: true }) slug: string;
  @Prop({ required: true }) title: string;
  @Prop({ type: [SectionSchema], default: [] }) sections: Section[];
}
export const PageSchema = SchemaFactory.createForClass(Page);
