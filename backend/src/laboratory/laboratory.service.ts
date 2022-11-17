import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Laboratory } from 'src/model/laboratory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LaboratoryService {
    constructor(@InjectRepository(Laboratory) private readonly repository: Repository<Laboratory>) { }

    public async getAll(createdBy: string) {
      return await this.repository.find({where: {createdBy: createdBy}});
    }

    public async get(id: string, createdBy: string) {
      return await this.repository.findOne({where: {id: id, createdBy: createdBy}});
    }

    public async create(entity: Laboratory): Promise<Laboratory> {
      return await this.repository.save(await this.repository.create(entity));
    }

    public async update(entity: Laboratory): Promise<Laboratory> {
      return await this.repository.save(entity);
    }

    public async delete(id: string, createdBy: string): Promise<void> {
      const entity = await this.repository.findOne({where: {id: id, createdBy: createdBy}});
      if (!entity) return;
      await this.repository.delete(id);
    }
}
