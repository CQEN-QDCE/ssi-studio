import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/model/organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
    constructor(@InjectRepository(Organization) private readonly repository: Repository<Organization>) { }

    public async getAll() {
      return await this.repository.find();
    }

    public async get(id: string) {
      return await this.repository.findOne({where: {id: id}});
    }

    public async create(organization: Organization): Promise<Organization> {
      return await this.repository.save(await this.repository.create(organization));
    }

    public async update(organization: Organization): Promise<Organization> {
      return await this.repository.save(organization);
    }

    public async delete(id: string): Promise<void> {
      await this.repository.delete(id);
    }
}
