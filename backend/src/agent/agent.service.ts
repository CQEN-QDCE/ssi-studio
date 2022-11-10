import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from 'src/model/agent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AgentService {
    constructor(@InjectRepository(Agent) private readonly repository: Repository<Agent>) { }

    public async getAll(id: string) {
      return await this.repository.find({where: {organizationId: id}});
    }

    public async get(id: string) {
      return await this.repository.findOne({where: {id: id}});
    }

    public async create(agent: Agent): Promise<Agent> {
      return await this.repository.save(await this.repository.create(agent));
    }

    public async update(agent: Agent): Promise<Agent> {
      return await this.repository.save(agent);
    }

    public async delete(id: string): Promise<void> {
      await this.repository.delete(id);
    }
}