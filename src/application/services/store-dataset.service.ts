import {
  Inject,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { IStoreDatasetUseCase } from '@/domain/use-cases/index'
import {
  IGetDatasetProvider
} from '@/providers/get-datasets/get-dataset.provider'
import { Dataset } from '@/domain/entities/index'
import { IDatasetsRepositoryPort } from '@/application/ports/index'
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StoreDuplicateDatasetException } from '@/core/exceptions/store-duplicate-dataset.exception';
@Injectable()
export class StoreDatasetService implements IStoreDatasetUseCase {
  constructor(
    @Inject('OpenMLGetDatasetProvider')
    private readonly getDatasetProvider: IGetDatasetProvider,
    @Inject('DatasetsRepository')
    private readonly datasetRepository: IDatasetsRepositoryPort,
    private eventEmitter: EventEmitter2,
  ) {}

  async execute(id: string, type: string): Promise<any> {
    try {
      const duplicate = await this.datasetRepository.findDuplicateOpenML(id)

      if (duplicate) {
        throw new StoreDuplicateDatasetException()
      }

      const { data } = await this.getDatasetProvider.getDatasetById(id);

      const dataset = new Dataset({
        providerId: data.id,
        name: data.name,
        format: data.format,
        downloadLink: data.url,
        type,
      })

      console.log({dataset})

      const savedDataset = await this.datasetRepository.saveDataset(dataset);

      this.eventEmitter.emit(
        'dataset_created',
        {
          _id: savedDataset._id,
          payload: { url: savedDataset.downloadLink },
        },
      );
      
    } catch (error) {
      throw error
    }
  }
}