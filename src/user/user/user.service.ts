import { Injectable } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation/validation.service';
import { z } from 'zod';

@Injectable()
export class UserService {
  constructor(private validationService: ValidationService) {}
  async sayHello(firstName: string, lastName: string): Promise<string> {
    const schema = z.object({
      firstName: z.string().min(3).max(100),
      lastName: z.string().min(3).max(100),
    });

    const result = this.validationService.validate(schema, {
      firstName,
      lastName,
    });

    return `Hello ${result.firstName} ${result.lastName}`;
  }
}
