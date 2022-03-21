import { Module } from '@nestjs/common';
import { RestModule } from '@/presentation/rest/rest.module'
import { GetDatasetProviderModule } from '@/providers/get-datasets/get-dataset-provider.module';
import { MongoModule } from '@/infra/mongodb/mongo.module'
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatasetsDownloadProgressGateway } from '@/presentation/websocket/sockets/datasets-download-progress.gateway'
@Module({
  imports: [
    RestModule,
    MongoModule,
    GetDatasetProviderModule,
    EventEmitterModule.forRoot(),
    DatasetsDownloadProgressGateway,
  ],
})
export class AppModule {}
