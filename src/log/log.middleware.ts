import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'nestjs-prisma';
import { Logger } from 'winston';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly prisma: PrismaService,
  ) {}

  use(req: Request, res: Response, next: () => void) {
    this.logger.info(`Request: ${req.method} ${req.url}`, {
      headers: req.headers,
      body: req.body,
    });

    this.prisma.$on('query', (e) => {
      this.logger.info(
        `[Target] ${e.target}, [Params] ${e.params}, [Query] ${e.query}, [Duration] ${e.duration} ms`,
      );
    });

    this.prisma.$on('error', (e) => {
      this.logger.error(e);
    });

    next();
  }
}
