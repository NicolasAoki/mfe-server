
import { Controller, Post, Body } from '@nestjs/common'
import { PreviewDatasetService } from '@/application/services/index'

@Controller('/')
export class PreviewDatasetsController {
  constructor(
    private previewDatasetsService: PreviewDatasetService
  ) {}

  @Post('/preview-dataset')
  async create(@Body() body: any): Promise<void> {
    try {
      console.log('preview', body)
      const arff = await this.previewDatasetsService.execute(body._id)

      return arff
    } catch (error) {
      throw error
    }
  }
}
