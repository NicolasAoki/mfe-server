import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { ILocalStoreDatasetUseCase } from '@/domain/use-cases/index'
import { Dataset } from '@/domain/entities/index'
import { IDatasetsRepositoryPort } from '@/application/ports/index'
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StoreDuplicateDatasetException } from '@/core/exceptions/store-duplicate-dataset.exception';
@Injectable()
export class LocalStoreDatasetService implements ILocalStoreDatasetUseCase {
  constructor(
    @Inject('DatasetsRepository')
    private readonly datasetRepository: IDatasetsRepositoryPort,
    private eventEmitter: EventEmitter2,
  ) {}

  async execute(file: any): Promise<any> {
    try {
      // const duplicate = await this.datasetRepository.findDuplicateOpenML(id)

      // if (duplicate) {
      //   throw new StoreDuplicateDatasetException()
      // }

      // {
      //   file: {
      //     fieldname: 'file',
      //     originalname: '623fba200c9d7b20d46218e6.arff',
      //     encoding: '7bit',
      //     mimetype: 'application/octet-stream',
      //     destination: './local-datasets',
      //     filename: '9829f0f77bcf90236b8dc9189634191f',
      //     path: 'local-datasets/9829f0f77bcf90236b8dc9189634191f',
      //     size: 720419
      //   }
      // }

      const dataset = new Dataset({
        name: file.filename,
        format: 'arff',
        type: 'local',
        path: file.path,
      })

      const savedDataset = await this.datasetRepository.saveDataset(dataset);

      await this.datasetRepository.downloadCompleted(savedDataset._id, savedDataset.path)
      
    } catch (error) {
      throw error
    }
  }
}