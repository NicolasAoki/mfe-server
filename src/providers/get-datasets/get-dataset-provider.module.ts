import { Module } from '@nestjs/common';
import { OpenMLGetDatasetProvider } from './implementations/openml/get-dataset.provider'

@Module({
  imports: [],
  controllers: [],
  exports: [OpenMLGetDatasetProvider],
  providers: [OpenMLGetDatasetProvider],
})
export class GetDatasetProviderModule {}
