import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Datasets as DatasetsSchema,
  DatasetsDocument
} from '@/infra/mongodb/schemas/datasets.schema'
import { IDatasetsRepositoryPort } from '@/application/ports/index';
import { Injectable } from '@nestjs/common';
import { Dataset } from '@/domain/entities';
import { ObjectId } from 'mongodb';


@Injectable()
export class DatasetsRepository implements IDatasetsRepositoryPort {
  constructor(
    @InjectModel(DatasetsSchema.name)
    private datasetsModel: Model<DatasetsDocument>,
  ) {}

  async findAllOrThrow(): Promise<any> {
    const datasets = await this.datasetsModel.find()

    return datasets
  }

  //TODO: replace any by Dataset + _id returned from the insertion
  async saveDataset(dataset: Dataset): Promise<any> {
    try {
      console.log(`Saving dataset`)
      const datasetDocument = new this.datasetsModel({
        name: dataset.name,
        providerId: dataset.providerId,
        format: dataset.format,
        downloadLink: dataset.downloadLink,
        downloadProgress: 0,
      })
  
  
      const saved = await datasetDocument.save()
      console.log({saved})
      return saved
    } catch (error) {
      console.log({error})
      throw error
    }
  }

  async deleteById(_id: string): Promise<void> {
    try {
      await this.datasetsModel.deleteOne({ _id: new ObjectId(_id) })
    } catch (error) {
      console.log(123,{error}) 
      throw error
    }
  }

  async downloadCompleted(id: string, path: string): Promise<void> {
    try {
      await this.datasetsModel.findByIdAndUpdate(id, {
        downloadProgress: 100,
        path,
      })
    } catch (error) {
      throw error
    }
  }
}
