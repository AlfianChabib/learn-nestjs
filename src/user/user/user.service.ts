import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async sayHello(firstName: string, lastName: string): Promise<string> {
    return `Hello ${firstName} ${lastName}`;
  }
}
