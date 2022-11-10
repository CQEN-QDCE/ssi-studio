import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueCredential } from 'src/model/issue-credential.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IssueCredentialService {
    constructor(@InjectRepository(IssueCredential) private readonly repository: Repository<IssueCredential>) { }

    public async getAll(id: string) {
      return await this.repository.find({where: {agentTemplateId: id}});
    }

    public async get(id: string) {
      return await this.repository.findOne({where: {id: id}});
    }

    public async create(issueCredential: IssueCredential): Promise<IssueCredential> {
      return await this.repository.save(await this.repository.create(issueCredential));
    }

    public async update(issueCredential: IssueCredential): Promise<IssueCredential> {
      return await this.repository.save(issueCredential);
    }

    public async delete(id: string): Promise<void> {
      await this.repository.delete(id);
    }
}