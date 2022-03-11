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
@Injectable()
export class StoreDatasetService implements IStoreDatasetUseCase {
  constructor(
    @Inject('OpenMLGetDatasetProvider')
    private readonly getDatasetProvider: IGetDatasetProvider,
    @Inject('DatasetsRepository')
    private readonly datasetRepository: IDatasetsRepositoryPort,

  ) {}

  async execute(id: String): Promise<any> {
    try {
      console.log({id})

      const { data } = await this.getDatasetProvider.getDatasetById(id)
      console.log({data})

      const dataset = new Dataset({
        providerId: data.id,
        name: data.name,
        format: data.format,
        downloadLink: data.url,
      })

      console.log({dataset})

      await this.datasetRepository.saveDataset(dataset)
      
      return
    } catch (error) {
      console.log({error})
    }
  }
}