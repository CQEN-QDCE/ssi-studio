import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'src/model/connection.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConnectionService {
    constructor(@InjectRepository(Connection) private readonly repository: Repository<Connection>) { }

    public async getAll(id: string) {
      return await this.repository.find({where: {organizationId: id}});
    }

    public async get(id: string) {
      return await this.repository.findOne({where: {id: id}});
    }

    public async create(connection: Connection): Promise<Connection> {
      return await this.repository.save(await this.repository.create(connection));
    }

    public async update(connection: Connection): Promise<Connection> {
      return await this.repository.save(connection);
    }

    public async delete(id: string): Promise<void> {
      await this.repository.delete(id);
    }
}