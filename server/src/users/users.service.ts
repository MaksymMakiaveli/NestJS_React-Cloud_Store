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

  async findAll() {
    const users = await this.userRepository.find();

    return users;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async create(dto: CreateUserDto) {
    this.logger.log('Start user creating');

    const { password, ...restDto } = dto;
    const newUser = this.userRepository.create({ hash: password, ...restDto });
    const user = await this.userRepository.save({
      ...newUser,
    });

    this.logger.log(`User created: ${JSON.stringify(user)}`);

    return user;
  }
}
