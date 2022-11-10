import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credential } from 'src/model/credential.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CredentialService {
    constructor(@InjectRepository(Credential) private readonly repository: Repository<Credential>) { }

    public async getAll(id: string) {
      return await this.repository.find({where: {organizationId: id}});
    }

    public async get(id: string) {
      return await this.repository.findOne({where: {id: id}});
    }

    public async create(credential: Credential): Promise<Credential> {
      return await this.repository.save(await this.repository.create(credential));
    }

    public async update(credential: Credential): Promise<Credential> {
      return await this.repository.save(credential);
    }

    public async delete(id: string): Promise<void> {
      await this.repository.delete(id);
    }
}