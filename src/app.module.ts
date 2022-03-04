import { Module } from '@nestjs/common';
import { RestModule } from './presentation/rest/rest.module'
import { GetDatasetProviderModule } from '@/providers/get-datasets/get-dataset-provider.module';

@Module({
  imports: [
    RestModule,
    GetDatasetProviderModule,
  ],
})
export class AppModule {}
