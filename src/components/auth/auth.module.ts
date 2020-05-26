import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import OrganizationModule from '../organization/organization.module';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './passportStrategies/local.strategy';
import {JwtStrategy} from './passportStrategies/jwt.strategy';
import {AuthController} from './auth.controller';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [OrganizationModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      // signOptions: { expiresIn: '60min' },
    })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})


export class AuthModule {}
