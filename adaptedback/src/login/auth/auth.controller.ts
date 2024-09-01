import { Controller, Post, Request } from '@nestjs/common';
import { CreateLoginDto } from '../dto/create-login.dto';
import { Resource } from '../help/login.dto';
import { LoginService } from '../login.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async getToken(@Request() req): Promise<Resource> {
    console.log('req', req.body);
    const user = req.body as CreateLoginDto;
    const access_token = await this.loginService.login(user);

    const res = new Resource({
      access_token: access_token,
      token_type: 'bearer',
      username: user.username,
    });

    console.log('res', res);
    return res;
  }
}
