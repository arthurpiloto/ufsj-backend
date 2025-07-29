import { Document } from 'mongoose';

export interface IAnnex {
  title: string;
  url: string;
  description?: string;
}

export interface IPageDocument {
  title: string;
  url?: string;
  description?: string;
  annexes: IAnnex[];
}

export interface ISection {
  title: string;
  type: string;
  documents: IPageDocument[];
}

export interface IPage extends Document {
  title: string;
  slug: string;
  sections: ISection[];
}
