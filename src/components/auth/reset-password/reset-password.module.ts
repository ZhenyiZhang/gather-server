import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import OrganizationModule from '../../organization/organization.module';
import {PassportModule} from '@nestjs/passport';
import {JwtResetPasswordStrategy} from '../passportStrategies/jwt.resetPassword.strategy';
import {jwtConstants} from "../constants";
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';

@Module({
  imports: [
      OrganizationModule,
      PassportModule,
      JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '10min' },
          })],
  providers: [ResetPasswordService, JwtResetPasswordStrategy],
  controllers: [ResetPasswordController]
})
export class ResetPasswordModule {}
