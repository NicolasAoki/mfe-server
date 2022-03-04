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
    private readonly getDatasetProvider: IGetDatasetProvider,
  ) {}

  async execute(id: String): Promise<any> {
    try {
      
      console.log({id})

      await this.getDatasetProvider.getDatasetById(id)

      return
    } catch (error) {
      console.log({error})
    }
  }
}