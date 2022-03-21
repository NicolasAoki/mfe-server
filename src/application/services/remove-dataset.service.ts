import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { IRemoveDatasetUseCase } from '@/domain/use-cases/index'
import { IDatasetsRepositoryPort } from '@/application/ports/index'
@Injectable()
export class RemoveDatasetService implements IRemoveDatasetUseCase {
  constructor(
    @Inject('DatasetsRepository')
    private readonly datasetRepository: IDatasetsRepositoryPort,
  ) {}

  async execute(_id: string): Promise<void> {
    try {
      await this.datasetRepository.deleteById(_id)
    } catch (error) {
      console.log({error})
    }
  }
}