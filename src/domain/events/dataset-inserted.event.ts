import { Controller } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { DownloadUrlDatasetService } from '@/application/services/index'
@Controller()
export class DatasetInsertedEvent {
  constructor(
    private downloadUrlDatasetService: DownloadUrlDatasetService
  ) {}

  
  @OnEvent('dataset_created', { async: true })
    async handleOrderCreatedEvent (data: any) {
      const dto = {
        id: data._id,
        url: data.payload.url,
      }
      console.log('calling downloadUrlDatasetService...')
      this.downloadUrlDatasetService.execute(dto.id, dto.url)
      console.log('done downloadUrlDatasetService')
  }
}