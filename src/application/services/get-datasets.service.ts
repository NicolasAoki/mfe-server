import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { IGetDatasetsUseCase } from '@/domain/use-cases/index'
import { Dataset } from '@/domain/entities/index'
import { IDatasetsRepositoryPort } from '@/application/ports/index'
@Injectable()
export class GetDatasetsService implements IGetDatasetsUseCase {
  constructor(
    @Inject('DatasetsRepository')
    private readonly datasetRepository: IDatasetsRepositoryPort,
  ) {}

  async execute(): Promise<any> {
    try {
      const datasets: Dataset[] = await this.datasetRepository.findAllOrThrow()
      return datasets
    } catch (error) {
      console.log({error})
    }
  }
}