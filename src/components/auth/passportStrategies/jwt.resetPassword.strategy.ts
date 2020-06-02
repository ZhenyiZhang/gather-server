import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import EnvVariables from "../../../EnvVariables";

@Injectable()
export class JwtResetPasswordStrategy extends PassportStrategy(Strategy, 'passwordReset') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: EnvVariables.PASSPORT_SECRET,
        });
    }

    async validate(payload: any) {
        return {email: payload.email
        };
    }

}