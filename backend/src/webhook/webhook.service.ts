import { Injectable } from '@nestjs/common';
import { User } from 'src/model/user.entity';

@Injectable()
export class WebHookService {
  constructor() {
  }

  public async get(agent: string) {
    const user = new User();
    user.username = 'stpma02'
    return new User();
  }
}