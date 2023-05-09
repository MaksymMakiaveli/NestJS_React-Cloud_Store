import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtRequestType } from '../common/constants';
import { UserEntity } from './entities';
import { ApiOkGlobalResponse } from '../common/decorators';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth(JwtRequestType.auth)
  @ApiOkGlobalResponse(UserEntity, { type: 'array' })
  findAll() {
    return this.usersService.findAll();
  }
}
