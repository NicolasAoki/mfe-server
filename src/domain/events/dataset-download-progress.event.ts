import { Controller } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Post } from '@nestjs/common'
import { DatasetsDownloadProgressGateway } from "@/presentation/websocket/sockets/datasets-download-progress.gateway";


@Controller()
export class DatasetDownloadProgressEvent {
  constructor(
    private datasetsDownloadProgressGateway: DatasetsDownloadProgressGateway
  ) {}

  @OnEvent('dataset_download_progress', { async: true })
  @Post()
  async datasetDownloadProgressEvent (data: any) {
    this.datasetsDownloadProgressGateway.alertProgressDownload(data)
  }
}
