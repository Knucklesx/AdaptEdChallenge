import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { Login } from './entities/login.entity';
import { LoginService } from './login.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Login]),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '600000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
