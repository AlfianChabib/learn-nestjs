import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Inject,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';

@Controller('/api/v1/users')
export class UserController {
  // base constructor
  constructor(
    private userService: UserService,
    private connection: Connection,
    private mailService: MailService,
    private userRepository: UserRepository,
    @Inject('EmailService') private emailService: MailService,
    private readonly memberService: MemberService,
  ) {}

  // base injection
  // @Inject(UserService)
  // private readonly userService: UserService;

  @Get('/connection')
  async getConnection(): Promise<string> {
    this.userRepository.save();
    this.mailService.send();
    this.emailService.send();

    console.info(this.memberService.getConnectionName());
    this.memberService.sendEmail();

    return this.connection.getName();
  }

  @Get('/hello/')
  async sayHello(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): Promise<string> {
    return await this.userService.sayHello(firstName, lastName);
  }

  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      name,
      title: 'Hello',
    });
  }

  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Cookie set');
  }

  @Get('/get-cookie')
  getCookie(@Req() req: Request): string {
    const cookie = req.cookies['name'];
    return cookie;
  }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  getSampleResponse(): Record<string, string> {
    return {
      data: 'Sample Response',
    };
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/v1/users/sample-response',
      statusCode: 302,
    };
  }

  @Get('/sample')
  getSample(): string {
    return `GET`;
  }

  @Get('/:id')
  getId(@Param('id') id: string): string {
    return `GET ${id}`;
  }

  @Post()
  post(): string {
    return 'POST';
  }
}
