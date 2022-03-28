import { Injectable } from '@nestjs/common';
import { ILocalArchiver } from './local-archiver.interface'
import * as arff from 'node-arff'

@Injectable()
export class LocalArchiverRepository implements ILocalArchiver {
  constructor() {}
  
  firstNRows(array, num: number) {
    return array.slice(0, num)
  }

  async previewDataset(path: string): Promise<any> {
    const { data } = await new Promise((res, rej) => {
      return arff.load(path, (err, data) => {
        if (err) {
          rej(err)
        }
        res(data)
      })
    })

    const arffPartialData = this.firstNRows(data, 15)
    return arffPartialData
  }
}
