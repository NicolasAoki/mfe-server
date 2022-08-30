import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { IGetDatasetsUseCase } from '@/domain/use-cases/index'
import { Dataset } from '@/domain/entities/index'
import { IDatasetsRepositoryPort } from '@/application/ports/index'
import axios from 'axios'
@Injectable()
export class GetDatasetsService implements IGetDatasetsUseCase {
  constructor(
    @Inject('DatasetsRepository')
    private readonly datasetRepository: IDatasetsRepositoryPort,
  ) {}

  async execute(): Promise<any> {
    try {
      const datasets: Dataset[] = await this.datasetRepository.findAllOrThrow()

      const datasetIds = datasets
        .reduce((acc, dataset) => {
          if (!dataset) return acc
          if (!acc) return dataset._id
          return acc += `,${dataset._id}`
        }, '')

      if (!datasetIds) return datasets

      const { data: datasetFeatures } = await axios.get(
        `http://localhost:5000/get_features?id=${datasetIds}`,
      );
      const datasetsWithFeature = datasets.map(dataset => {
        const feature = datasetFeatures.find(feature => feature.datasetId === String(dataset._id))
        console.log({dataset})
        return {
          _id: dataset._id,
          type: dataset.type,
          downloadProgress: dataset.downloadProgress,
          downloadLink: dataset.downloadLink,
          format: dataset.format,
          name: dataset.name,
          providerId: dataset.providerId,
          path: dataset.path,
          keys: feature?.keys,
          values: feature?.values,
        }
      })
      console.log({datasetsWithFeature})
      return datasetsWithFeature
    } catch (error) {
      console.log({error})
    }
  }
}