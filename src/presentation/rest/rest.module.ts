import { Module } from '@nestjs/common';
//controllers
import { StoreDatasetController } from './controllers/store-dataset.controller'
import { GetDatasetsController } from '@/presentation/rest/controllers/get-datasets.controller'
import { RemoveDatasetsController } from '@/presentation/rest/controllers/remove-dataset.controller'
import { PreviewDatasetsController } from '@/presentation/rest/controllers/preview-dataset.controller'
//services
import {
  StoreDatasetService,
  GetDatasetsService,
  RemoveDatasetService,
  DownloadUrlDatasetService,
  LocalStoreDatasetService,
  PreviewDatasetService,
} from '@/application/services/index'
//event-listeners
import {
  DatasetInsertedEvent,
  DatasetDownloadProgressEvent,
} from '@/domain/events/index'
//gateway
import {
  DatasetsDownloadProgressGateway
} from '@/presentation/websocket/sockets/datasets-download-progress.gateway'

import { GetDatasetProviderModule } from '@/providers/get-datasets/get-dataset-provider.module'
import { OpenMLGetDatasetProvider } from '@/providers/get-datasets/implementations/openml/get-dataset.provider';
import { MongooseRepositoriesModule } from '@/infra/mongodb/mongoose.module'
import { DatasetsRepository } from '@/infra/mongodb/repositories/datasets.repository'
import { LocalArchiverRepository } from '@/infra/localArchiver/local-archiver.repository';
@Module({
  imports: [
    MongooseRepositoriesModule,
    GetDatasetProviderModule,
  ],
  controllers: [
    StoreDatasetController,
    GetDatasetsController,
    RemoveDatasetsController,
    PreviewDatasetsController,
    DatasetInsertedEvent,
    DatasetDownloadProgressEvent,
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
    {
      provide: 'LocalArchiverRepository',
      useClass: LocalArchiverRepository,
    },
    StoreDatasetService,
    GetDatasetsService,
    RemoveDatasetService,
    DownloadUrlDatasetService,
    LocalStoreDatasetService,
    PreviewDatasetService,
    DatasetsDownloadProgressGateway,
  ],
})
export class RestModule {}
