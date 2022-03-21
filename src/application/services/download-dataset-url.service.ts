import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { IDownloadUrlDatasetUseCase } from '@/domain/use-cases/index'
import { IDatasetsRepositoryPort } from '@/application/ports/index'
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as fs from 'fs'
import * as request from 'request'
import * as progress from 'request-progress'
import * as path from 'path'

@Injectable()
export class DownloadUrlDatasetService implements IDownloadUrlDatasetUseCase {
  constructor(
    @Inject('DatasetsRepository')
    private readonly datasetRepository: IDatasetsRepositoryPort,
    private eventEmitter: EventEmitter2,
  ) {}

  async isExists(path) {
    try {
      await fs.promises.access(path);
      return true;
    } catch {
      return false;
    }
  };
  
  async writeFile(filePath) {
    try {
      const dirname = path.dirname(filePath);
      const exist = await this.isExists(dirname);
      if (!exist) {
        await fs.promises.mkdir(dirname, {recursive: true});
      }
      
      await fs.promises.writeFile(filePath, '', 'utf8');
    } catch (err) {
      throw new Error(err);
    }
  }

  async execute(id: string, url: string): Promise<void> {
    try {
      const path = `datasets/${id}.arff`

      await this.writeFile(path);

      await new Promise((res, rej) => {
        progress(request(url), { delay: 1000 })
        .on('progress', state => {
          this.eventEmitter.emit(
            'dataset_download_progress',
            {
              _id: id,
              payload: {
                size: state.size.total,
                percentage: state.percent,
                speed: state.speed,
                remainingTime: state.time.remaining,
              },
            },
          );
        })
        .on('error', function (err) {
          // Do something with err 
          rej('error')
        })
        .on('end', () => {
          // Do something after request finishes 
          this.eventEmitter.emit(
            'dataset_download_progress',
            {
              _id: id,
              payload: {
                percentage: 1,
                path,
              },
            },
          );
          res('finished')
        })
        .pipe(fs.createWriteStream(`${path}`));
      })
      
      await this.datasetRepository.downloadCompleted(id, path)
    } catch (error) {
      console.log({error})

    }
  }
}