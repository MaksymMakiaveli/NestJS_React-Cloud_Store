import { Injectable } from '@nestjs/common';
import { UsersService } from '../users';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(dto: SignInDto) {
    const user = await this.userService.findByEmail(dto.email);

    console.log(user);
  }

  private async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
  }
}
