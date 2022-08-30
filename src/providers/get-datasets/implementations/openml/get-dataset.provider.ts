import { IGetDatasetProvider } from '../../get-dataset.provider'
import { Injectable } from '@nestjs/common';
import { get } from '../../../../infra/utils'
import { API_URL } from './config'

@Injectable()
export class OpenMLGetDatasetProvider implements IGetDatasetProvider {
  constructor() {}
  
  async getDatasetById(id: string): Promise<any> {
    try {
      
      const response = await get({
        url: `${API_URL}/data/${id}`,
      })

      const dto = {
        data: response.data.data_set_description
      }
      return dto
    } catch (error) {
      console.error(error)
      throw error
    }       
  }
}
