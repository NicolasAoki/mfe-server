
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { StoreDatasetService } from '../../../application/services/store-dataset.service'
import { LocalStoreDatasetService } from '@/application/services/local-store-dataset.service'

@Controller('/')
export class StoreDatasetController {
  constructor(
    private storeDatasetService: StoreDatasetService,
    private localStoreDatasetService: LocalStoreDatasetService,
  ) {}

  @Post('/store-dataset')
  async create(@Body() dataset: any): Promise<void> {
    await this.storeDatasetService.execute(dataset.id, dataset.type)
  }

  @Post('/store-dataset/local')
  @UseInterceptors(FileInterceptor('file', {
    dest: './local-datasets'
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.localStoreDatasetService.execute(file)
  }
}
