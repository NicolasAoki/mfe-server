export interface IStoreDatasetUseCase {
  execute(id: String): Promise<any>;
}
