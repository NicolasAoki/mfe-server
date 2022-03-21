export interface IDownloadUrlDatasetUseCase {
  execute(id: string, url: string): Promise<any>;
}
