export interface IPreviewDatasetUseCase {
  execute(_id: string): Promise<any>;
}
