import { IGetDatasetProvider } from '../../get-dataset.provider'
import { Injectable } from '@nestjs/common';
import { get } from '../../../../infra/utils'
import { API_URL } from './config'

@Injectable()
export class OpenMLGetDatasetProvider implements IGetDatasetProvider {
  constructor() {}
  
  async getDatasetById(id: String): Promise<any[]> {
    try {
      
      const response = await get({
        url: `${API_URL}/data/${id}`,
      })

      console.log({response})
      return
    } catch (error) {
      console.error(error)
      throw error
    }       
  }
}
