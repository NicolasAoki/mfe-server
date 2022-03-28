import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { IPreviewDatasetUseCase } from '@/domain/use-cases/index'
import { IDatasetsRepositoryPort } from '@/application/ports/index'
import { ILocalArchiver } from '@/infra/localArchiver/local-archiver.interface'

@Injectable()
export class PreviewDatasetService implements IPreviewDatasetUseCase {
  constructor(
    @Inject('DatasetsRepository')
    private readonly datasetRepository: IDatasetsRepositoryPort,
    @Inject('LocalArchiverRepository')
    private readonly localArchiver: ILocalArchiver,
  ) {}

  async execute(_id: string): Promise<any> {
    try {
      const { path } = await this.datasetRepository.findOneOrThrow(_id)

      const arffData = await this.localArchiver.previewDataset(path)

      return arffData

    } catch (error) {
      throw error
    }
  }
}