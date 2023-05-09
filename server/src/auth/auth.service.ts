import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private userService: UsersService,

    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignUpDto) {
    const { email, password, ...restDto } = dto;

    const hash = await this.hashPassword(password);

    const newUser = await this.userService.create({
      email,
      password: hash,
      ...restDto,
    });

    return {
      accessToken: await this.getToken(newUser.id, newUser.email),
    };
  }

  async signin(dto: SignInDto) {
    const { email, password } = dto;
    const user = await this.userService.findByEmail(email);

    const isValid = await argon.verify(user.hash, password);

    if (!isValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    const token = await this.getToken(user.id, user.email);

    return {
      accessToken: token,
    };
  }

  private async hashPassword(password: string) {
    return await argon.hash(password);
  }

  private async getToken(userID: number, email: string) {
    const payload = { sub: userID, email };

    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('SECRET_KEY'),
      expiresIn: '1d',
    });

    return token;
  }
}
