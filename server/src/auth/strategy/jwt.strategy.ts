import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtRequestType } from '../../common/constants';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users';

type JwtPayload = {
  sub: number;

  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  JwtRequestType.auth,
) {
  constructor(
    private readonly configService: ConfigService,

    private readonly authService: AuthService,

    private readonly userService: UsersService,
  ) {
    super({
      secretOrKey: configService.get('SECRET_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;

    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
