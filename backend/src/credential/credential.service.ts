import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credential } from 'src/model/credential.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CredentialService {
    constructor(@InjectRepository(Credential) private readonly repository: Repository<Credential>) { }

    public async getAll(laboratoryId: string, createdBy: string) {
      return await this.repository.find({where: {laboratoryId: laboratoryId, createdBy: createdBy}});
    }

    public async get(id: string, createdBy: string) {
      return await this.repository.findOne({where: {id: id, createdBy: createdBy}});
    }

    public async create(credential: Credential): Promise<Credential> {
      return await this.repository.save(await this.repository.create(credential));
    }

    public async update(credential: Credential): Promise<Credential> {
      return await this.repository.save(credential);
    }

    public async delete(id: string, createdBy: string): Promise<void> {
      const credential = await this.repository.findOne({where: {id: id, createdBy: createdBy}});
      if (!credential) return;
      await this.repository.delete(id);
    }
}