import { Injectable } from '@nestjs/common';
import { OrganizationService } from '../organization/organization.service';
import { JwtService } from '@nestjs/jwt';

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
    console.log(user);
    const payload = { username: user.name, sub: user._id };
    return {
      AccessToken: this.jwtService.sign(payload),
    };
  }
}