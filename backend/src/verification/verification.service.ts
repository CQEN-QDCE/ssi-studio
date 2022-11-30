import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verification } from 'src/model/verification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VerificationService {
    constructor(@InjectRepository(Verification) private readonly repository: Repository<Verification>) { }

    public async getAll(laboratoryId: string, createdBy: string) {
      return await this.repository.find({where: {laboratoryId: laboratoryId, createdBy: createdBy}});
    }

    public async get(id: string, createdBy: string) {
      return await this.repository.findOne({where: {id: id, createdBy: createdBy}});
    }

    public async create(verification: Verification): Promise<Verification> {
      return await this.repository.save(await this.repository.create(verification));
    }

    public async update(verification: Verification): Promise<Verification> {
      return await this.repository.save(verification);
    }

    public async delete(id: string, createdBy: string): Promise<void> {
      const verification = await this.repository.findOne({where: {id: id, createdBy: createdBy}});
      if (!verification) return;
      await this.repository.delete(id);
    }
}