import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { IStoreDatasetUseCase } from '@/domain/use-cases/index'
import {
  IGetDatasetProvider
} from '@/providers/get-datasets/get-dataset.provider'
import { Dataset } from '@/domain/entities/index'
import { IDatasetsRepositoryPort } from '@/application/ports/index'
import { EventEmitter2 } from '@nestjs/event-emitter';
@Injectable()
export class StoreDatasetService implements IStoreDatasetUseCase {
  constructor(
    @Inject('OpenMLGetDatasetProvider')
    private readonly getDatasetProvider: IGetDatasetProvider,
    @Inject('DatasetsRepository')
    private readonly datasetRepository: IDatasetsRepositoryPort,
    private eventEmitter: EventEmitter2,
  ) {}

  async execute(id: string): Promise<any> {
    try {
      console.log({id})

      const { data } = await this.getDatasetProvider.getDatasetById(id);
      console.log({data})

      const dataset = new Dataset({
        providerId: data.id,
        name: data.name,
        format: data.format,
        downloadLink: data.url,
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
      
      
      return
    } catch (error) {
      console.log({error})
    }
  }
}