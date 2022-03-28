import { Dataset } from "@/domain/entities"

export interface IDatasetsRepositoryPort {
  findOneOrThrow(_id: string): Promise<any>
  findAllOrThrow(): Promise<any>
  saveDataset(dataset: Dataset): Promise<any>
  deleteById(_id: string): Promise<void>
  downloadCompleted(id: string, path: string): Promise<void>
  findDuplicateOpenML(id: string): Promise<boolean>
}
