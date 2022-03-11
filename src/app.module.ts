import { Module } from '@nestjs/common';
import { RestModule } from '@/presentation/rest/rest.module'
import { GetDatasetProviderModule } from '@/providers/get-datasets/get-dataset-provider.module';
import { MongoModule } from '@/infra/mongodb/mongo.module'
@Module({
  imports: [
    RestModule,
    MongoModule,
    GetDatasetProviderModule,
  ],
})
export class AppModule {}
