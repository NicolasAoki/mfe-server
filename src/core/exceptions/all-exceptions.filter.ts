import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ExceptionBase } from './exception.base';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor() {
    super();
  }
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof ExceptionBase) {
      return response.status(exception.httpCode || 400).json({
        statusCode: exception.httpCode || 400,
        error: exception.code,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception?.message || 'Internal server error'
        : 'Internal server error';

    response.status(status).json({
      statusCode: status,
      error: exception.code || 'INTERNAL_SERVER_ERROR',
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
