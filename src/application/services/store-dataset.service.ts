import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { IStoreDatasetUseCase } from '../../domain/use-cases/index'
import {
  IGetDatasetProvider
} from '../../providers/get-datasets/get-dataset.provider'

@Injectable()
export class StoreDatasetService implements IStoreDatasetUseCase {
  constructor(
    @Inject('OpenMLGetDatasetProvider')
    private readonly getDatasetProvider: IGetDatasetProvider,
  ) {}

  async execute(id: String): Promise<any> {
    try {
      console.log({id})

      const dataset = await this.getDatasetProvider.getDatasetById(id)

      console.log({dataset})

      return
    } catch (error) {
      console.log({error})
    }
  }
}