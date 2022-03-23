
import {
  Controller,
  Post,
  Body,
} from '@nestjs/common'
import { StoreDatasetService } from '../../../application/services/store-dataset.service'

@Controller('/')
export class StoreDatasetController {
  constructor(
    private storeDatasetService: StoreDatasetService
  ) {}

  @Post('/store-dataset')
  async create(@Body() dataset: any): Promise<void> {
    await this.storeDatasetService.execute(dataset.id, dataset.type)
  }
}
