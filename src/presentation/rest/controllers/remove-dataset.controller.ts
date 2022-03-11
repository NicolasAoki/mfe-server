
import { Controller, Post, Body } from '@nestjs/common'
import { RemoveDatasetService } from '@/application/services/index'

@Controller('/')
export class RemoveDatasetsController {
  constructor(
    private removeDatasetsService: RemoveDatasetService
  ) {}

  @Post('/remove-dataset')
  async create(@Body() body: any): Promise<void> {
    try {
      console.log('deleting', body)
      await this.removeDatasetsService.execute(body._id)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
