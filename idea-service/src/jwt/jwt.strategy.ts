import { ExtractJwt, Strategy } from 'idea-service/node_modules/passport-jwt';
import { PassportStrategy } from 'idea-service/node_modules/@nestjs/passport';
import { Injectable } from 'idea-service/node_modules/@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.KEY,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}