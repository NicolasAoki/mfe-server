import { Module } from '@nestjs/common';
import { LocalArchiverRepository } from './local-archiver.repository';

@Module({
  imports: [],
  controllers: [],
  exports: [LocalArchiverRepository],
  providers: [LocalArchiverRepository],
})

export class LocalArchiverModule {}
