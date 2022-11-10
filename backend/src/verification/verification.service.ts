import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verification } from 'src/model/verification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VerificationService {
    constructor(@InjectRepository(Verification) private readonly repository: Repository<Verification>) { }

    public async getAll(id: string) {
      return await this.repository.find({where: {organizationId: id}});
    }

    public async get(id: string) {
      return await this.repository.findOne({where: {id: id}});
    }

    public async create(verification: Verification): Promise<Verification> {
      return await this.repository.save(await this.repository.create(verification));
    }

    public async update(verification: Verification): Promise<Verification> {
      return await this.repository.save(verification);
    }

    public async delete(id: string): Promise<void> {
      await this.repository.delete(id);
    }
}