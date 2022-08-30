
import { Controller, Get } from '@nestjs/common'
import { GetDatasetsService } from '@/application/services/index'

@Controller('/')
export class GetDatasetsController {
  constructor(
    private getDatasetsService: GetDatasetsService
  ) {}

  @Get('/get-datasets')
  async create(): Promise<any> {
    try {
      const datasets = await this.getDatasetsService.execute()
      return datasets
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
