import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'src/model/connection.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConnectionService {
    constructor(@InjectRepository(Connection) private readonly repository: Repository<Connection>) { }

    public async getAll(organizationId: string, createdBy: string) {
      return await this.repository.find({where: {organizationId: organizationId, createdBy: createdBy}});
    }

    public async get(id: string, createdBy: string) {
      return await this.repository.findOne({where: {id: id, createdBy: createdBy}});
    }

    public async create(connection: Connection): Promise<Connection> {
      return await this.repository.save(await this.repository.create(connection));
    }

    public async update(connection: Connection): Promise<Connection> {
      return await this.repository.save(connection);
    }

    public async delete(id: string, createdBy: string): Promise<void> {
      const connection = await this.repository.findOne({where: {id: id, createdBy: createdBy}});
      if (!connection) return;
      await this.repository.delete(id);
    }
}