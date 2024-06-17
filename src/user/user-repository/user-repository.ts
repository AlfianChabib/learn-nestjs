import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'nestjs-prisma';
import { Logger } from 'winston';

@Injectable()
export class UserRepository {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    this.logger.info('UserRepository constructor');
  }

  async save(firstName: string, lastName: string): Promise<User> {
    this.logger.info(
      `Create user with firstName ${firstName} and lastName ${lastName}`,
    );
    return await this.prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    });
  }
}
