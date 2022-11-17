import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from 'src/model/agent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AgentService {
    constructor(@InjectRepository(Agent) private readonly repository: Repository<Agent>) { }

    public async getAll(organizationId: string, createdBy: string) {
      return await this.repository.find({where: {organizationId: organizationId, createdBy: createdBy}});
    }

    public async get(id: string, createdBy: string) {
      return await this.repository.findOne({where: {id: id, createdBy: createdBy}});
    }

    public async create(agent: Agent): Promise<Agent> {
      return await this.repository.save(await this.repository.create(agent));
    }

    public async update(agent: Agent): Promise<Agent> {
      return await this.repository.save(agent);
    }

    public async delete(id: string, createdBy: string): Promise<void> {
      const agent = await this.repository.findOne({where: {id: id, createdBy: createdBy}});
      if (!agent) return;
      await this.repository.delete(id);
    }
}