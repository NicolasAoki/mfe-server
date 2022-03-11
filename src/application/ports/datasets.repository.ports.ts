import { Dataset } from "@/domain/entities"

export interface IDatasetsRepositoryPort {
  findAllOrThrow(): Promise<any>
  saveDataset(dataset: Dataset): Promise<void>
  deleteById(_id: String): Promise<void>
}
