import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Datasets,
  DatasetSchema
} from '@/infra/mongodb/schemas/datasets.schema'
import {
  DatasetsRepository,
} from '@/infra/mongodb/repositories/datasets.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Datasets.name, schema: DatasetSchema },
    ]),
  ],
  providers: [DatasetsRepository],
  exports: [DatasetsRepository, MongooseModule],
})
export class MongooseRepositoriesModule {}
