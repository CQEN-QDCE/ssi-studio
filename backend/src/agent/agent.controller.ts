import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Agent } from 'src/model/agent.entity';
import { AgentService } from './agent.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('/api/v1')
export class AgentController {

    constructor(private service: AgentService) { 
    }

    @Get('organizations/:id/agents')
    public async getAll(@Param('id') id) {
      return await this.service.getAll(id);
    }

    @Get('/agents/:id')
    public async get(@Param('id') id) {
      return await this.service.get(id);
    }

    @Post('/agents')
    public async create(@Body() dto: Agent) {
      const agent = new Agent();
      agent.id = uuidv4();
      agent.createdBy = 'me';
      agent.lastChangedBy = 'me';
      agent.name = dto.name;
      agent.organizationId = dto.organizationId;
      agent.url = dto.url;
      agent.apiKey = dto.apiKey;
      return await this.service.create(agent);
    }

    @Put('/agents')
    public async update(@Body() dto: Agent) {
      const agent = new Agent();
      agent.id = dto.id;
      agent.lastChangedBy = dto.lastChangedBy;
      agent.name = dto.name;
      agent.organizationId = dto.organizationId;
      agent.url = dto.url;
      agent.apiKey = dto.apiKey;
      return await this.service.update(agent);
    }

    @Delete('/agents/:id')
    public async delete(@Param('id') id) {
      return await this.service.delete(id);
    }
  
}
