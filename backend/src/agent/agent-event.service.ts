import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentEventResult } from 'src/model/agent-event-result';
import { AgentEvent } from 'src/model/agent-event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AgentEventService {
    constructor(@InjectRepository(AgentEvent) private readonly repository: Repository<AgentEvent>) { }

    public async getBySlug(agentSlug: string, createdBy: string, skip: number, take: number): Promise<AgentEventResult> {
      const [result, total] = await this.repository.findAndCount({ where: {agentSlug: agentSlug, createdBy: createdBy}, 
                                                                   take: take,
                                                                   skip: skip,
                                                                   order: {createDateTime: 'DESC'} });
      const agentEventResult = new AgentEventResult();
      agentEventResult.agentEvents = result;
      agentEventResult.total = total;
      agentEventResult.skip = skip;
      agentEventResult.take = take;

      return agentEventResult;
    }

    public async get(id: string, createdBy: string): Promise<AgentEvent> {
      return await this.repository.findOne({where: {id: id, createdBy: createdBy}});
    }

    public async create(agent: AgentEvent): Promise<AgentEvent> {
      return await this.repository.save(await this.repository.create(agent));
    }

    public async update(agent: AgentEvent): Promise<AgentEvent> {
      return await this.repository.save(agent);
    }

    public async delete(id: string, createdBy: string): Promise<void> {
      const agent = await this.repository.findOne({where: {id: id, createdBy: createdBy}});
      if (!agent) return;
      await this.repository.delete(id);
    }
}