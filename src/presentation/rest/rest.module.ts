import { Module } from '@nestjs/common';
import { StoreDatasetController } from './controllers/store-dataset.controller'
import { GetDatasetProviderModule } from '@/providers/get-datasets/get-dataset-provider.module'
import { StoreDatasetService } from '@/application/services/index'
import { OpenMLGetDatasetProvider } from '@/providers/get-datasets/implementations/openml/get-dataset.provider';

@Module({
  imports: [
    GetDatasetProviderModule,
  ],
  controllers: [
    StoreDatasetController,
  ],
  providers: [
    {
      provide: 'OpenMLGetDatasetProvider',
      useClass: OpenMLGetDatasetProvider,
    },
    // GetDatasetProviderModule,
    StoreDatasetService,
  ],
})
export class RestModule {}


// Error: Nest can't resolve dependencies of the StoreDatasetService (?). Please make sure that the argument OpenMLGetDatasetProvider at index [0] is available in the RestModule context.

// Potential solutions:
// - If OpenMLGetDatasetProvider is a provider, is it part of the current RestModule?
// - If OpenMLGetDatasetProvider is exported from a separate @Module, is that module imported within RestModule?
//   @Module({
//     imports: [ /* the Module containing OpenMLGetDatasetProvider */ ]
//   })

