export interface IStoreDatasetUseCase {
  execute(id: string, type: string): Promise<any>;
}
