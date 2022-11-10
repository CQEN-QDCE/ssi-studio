import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/model/user.entity';

@Controller('/api/v1')
export class UserController {

    constructor(private service: UserService) { 
    }

    @Post('/users')
    public async create(@Body() dto: User) {
      const user = new User();
      user.id = uuidv4();
      user.username = dto.username;
      user.password = dto.password;
      return await this.service.create(user);
    }
}
