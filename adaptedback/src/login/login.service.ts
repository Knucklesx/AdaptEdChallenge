import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoginDto } from './dto/create-login.dto';
import { Login } from './entities/login.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login) private loginRepository: Repository<Login>,
  ) {}
  // create(createLoginDto: CreateLoginDto)
  create(createLoginDto: CreateLoginDto) {
    console.log(createLoginDto);
    return 'This action adds a new login';
  }

  findAll() {
    return this.loginRepository.find();
  }

  async login(createLoginDto: CreateLoginDto) {
    const { username, password } = createLoginDto;
    const user = await this.loginRepository.findOneBy({ username });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} login`;
  // }

  // update(id: number, updateLoginDto: UpdateLoginDto) {
  //   return `This action updates a #${id} login`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} login`;
  // }
}
