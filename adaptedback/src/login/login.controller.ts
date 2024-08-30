import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  findAll() {
    return this.loginService.findAll();
  }

  @Post()
  create(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.login(createLoginDto);
  }
}
