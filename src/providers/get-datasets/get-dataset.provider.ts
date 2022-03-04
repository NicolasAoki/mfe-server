export interface IGetDatasetProvider {
  getDatasetById(id: String): Promise<any>
}
