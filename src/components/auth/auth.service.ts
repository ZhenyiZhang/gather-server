import { Injectable } from '@nestjs/common';
import { OrganizationService } from '../organization/organization.service';
import { JwtService } from '@nestjs/jwt';
import {Event} from '../event/interface/event.interface'
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

  async getProfile(userId: string) {
     return this.organizationService.getProfile(userId);
  }

  async deleteEvent(userId: string, eventId: string) {
    return this.organizationService.deleteEvent(userId, eventId);
  }

  async logout(userId: string) {
    return this.organizationService.logout(userId);
  }

  async updateEvent(userId: string, eventId: string, eventUpdateData: Event) {
    return this.organizationService.updateEvent(userId, eventId, eventUpdateData);
  }
}