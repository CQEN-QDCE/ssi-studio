import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/model/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  public async create(user: User): Promise<User> {
    return await this.repository.save(await this.repository.create(user));
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.repository.findOne({ where: { username } });
  }
}