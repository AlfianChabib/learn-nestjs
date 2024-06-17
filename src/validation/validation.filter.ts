import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof ZodError) {
      response.status(400).json({
        code: 400,
        errors: exception.issues,
      });
    }

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        code: exception.getStatus(),
        errors: exception.message,
      });
    }
  }
}
