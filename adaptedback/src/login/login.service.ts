import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateLoginDto } from './dto/create-login.dto';
import { Login } from './entities/login.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login) private loginRepository: Repository<Login>,
    private jwtService: JwtService,
  ) {}

  findByUsername(username: string) {
    return this.loginRepository.findOneBy({ username });
  }

  async login(createLoginDto: CreateLoginDto): Promise<string> {
    const { username, password } = createLoginDto;
    const user = await this.findByUsername(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.id };

    const access_token = await this.jwtService.sign(payload);

    return access_token;
  }

  async generateAccessToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
