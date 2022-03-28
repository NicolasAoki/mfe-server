import { Module } from '@nestjs/common';
import { RestModule } from '@/presentation/rest/rest.module'
import { GetDatasetProviderModule } from '@/providers/get-datasets/get-dataset-provider.module';
import { MongoModule } from '@/infra/mongodb/mongo.module'
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatasetsDownloadProgressGateway } from '@/presentation/websocket/sockets/datasets-download-progress.gateway'
import { LocalArchiverModule } from './infra/localArchiver/local-archiver.module';
@Module({
  imports: [
    RestModule,
    MongoModule,
    LocalArchiverModule,
    GetDatasetProviderModule,
    EventEmitterModule.forRoot(),
    DatasetsDownloadProgressGateway,
  ],
})
export class AppModule {}
