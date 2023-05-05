import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  create(dto: CreateUserDto) {
    console.log('hi');
  }
}
