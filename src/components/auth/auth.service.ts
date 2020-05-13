import { Injectable } from '@nestjs/common';
import { OrganizationService } from '../organization/organization.service';
import { JwtService } from '@nestjs/jwt';
import LoginErrorInterface from './interface/loginError.interface'

@Injectable()
export class AuthService {
  constructor(
    private organizationService: OrganizationService,
    private jwtService: JwtService
  ) {}

  async validateOrganization(name: string, password: string): Promise<any> {
    return await this.organizationService.login(name, password);
  }

  async login(user: any) {
    const report: LoginErrorInterface = user;
    if(report.usernameError) return Promise.reject('User does not exist');
    if(report.passwordError) return Promise.reject('Password is not correct');
    const payload = {
      username: user.name,
      sub: user._id
    };
    return {
      AccessToken: this.jwtService.sign(payload),
    };
  }

  async getProfile(userId) {
     return this.organizationService.getProfile(userId);
  }
}