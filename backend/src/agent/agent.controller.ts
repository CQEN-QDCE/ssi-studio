import { Body, Controller, Request, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Agent } from 'src/model/agent.entity';
import { AgentService } from './agent.service';
import { v4 as uuidv4 } from 'uuid';
import { Roles, RoleMatchingMode } from 'nest-keycloak-connect';

@Controller('/api/v1')
export class AgentController {

    constructor(private service: AgentService) { 
    }

    @Get('organizations/:id/agents')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async getAll(@Param('id') id, @Request() request) {
      return await this.service.getAll(id, request.user.sub);
    }

    @Get('/agents/:id')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async get(@Param('id') id, @Request() request) {
      return await this.service.get(id, request.user.sub);
    }

    @Post('/agents')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async create(@Body() dto: Agent, @Request() request) {
      const agent = new Agent();
      agent.id = uuidv4();
      agent.createdBy = request.user.sub;
      agent.lastChangedBy = request.user.sub;
      agent.name = dto.name;
      agent.organizationId = dto.organizationId;
      agent.url = dto.url;
      agent.apiKey = dto.apiKey;
      return await this.service.create(agent);
    }

    @Put('/agents')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async update(@Body() dto: Agent, @Request() request) {
      const agent = new Agent();
      agent.id = dto.id;
      agent.lastChangedBy = request.user.sub;
      agent.name = dto.name;
      agent.organizationId = dto.organizationId;
      agent.url = dto.url;
      agent.apiKey = dto.apiKey;
      return await this.service.update(agent);
    }

    @Delete('/agents/:id')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async delete(@Param('id') id, @Request() request) {
      return await this.service.delete(id, request.user.sub);
    }
  
}
