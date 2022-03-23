import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DatasetsDocument = Datasets & Document;

@Schema({ timestamps: true })
export class Datasets {
  @Prop()
  providerId: string;

  @Prop()
  name: string;

  @Prop()
  format: string;

  @Prop()
  downloadLink: string;

  @Prop()
  downloadProgress: number;

  @Prop()
  path: string;

  @Prop()
  type: string;
  
}

export const DatasetSchema = SchemaFactory.createForClass(Datasets);