import mongoose, { Schema, Document } from 'mongoose';
import { IPage } from '../types/page';

const AnnexSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
});

const PageDocumentSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String },
  description: { type: String },
  annexes: [AnnexSchema],
});

const SectionSchema: Schema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  documents: [PageDocumentSchema],
});

const PageSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sections: [SectionSchema],
  },
  { timestamps: true },
);

export default mongoose.model<IPage>('Page', PageSchema);
