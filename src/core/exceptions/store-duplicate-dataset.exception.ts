import { HttpStatus } from '@nestjs/common';
import { ExceptionBase } from './exception.base';

export class StoreDuplicateDatasetException extends ExceptionBase {
  constructor(message = 'duplicate dataset added') {
    super(message);
  }

  readonly code = String(HttpStatus.BAD_REQUEST)
}
