import { Module } from '@nestjs/common';
//controllers
import { StoreDatasetController } from './controllers/store-dataset.controller'
import { GetDatasetsController } from '@/presentation/rest/controllers/get-datasets.controller'
import { RemoveDatasetsController } from '@/presentation/rest/controllers/remove-dataset.controller'
//services
import {
  StoreDatasetService,
  GetDatasetsService,
  RemoveDatasetService
} from '@/application/services/index'

import { GetDatasetProviderModule } from '@/providers/get-datasets/get-dataset-provider.module'
import { OpenMLGetDatasetProvider } from '@/providers/get-datasets/implementations/openml/get-dataset.provider';
import { MongooseRepositoriesModule } from '@/infra/mongodb/mongoose.module'
import { DatasetsRepository } from '@/infra/mongodb/repositories/datasets.repository'
@Module({
  imports: [
    MongooseRepositoriesModule,
    GetDatasetProviderModule,
  ],
  controllers: [
    StoreDatasetController,
    GetDatasetsController,
    RemoveDatasetsController,
  ],
  providers: [
    {
      provide: 'OpenMLGetDatasetProvider',
      useClass: OpenMLGetDatasetProvider,
    },
    {
      provide: 'DatasetsRepository',
      useClass: DatasetsRepository,
    },
    StoreDatasetService,
    GetDatasetsService,
    RemoveDatasetService,
  ],
})
export class RestModule {}
