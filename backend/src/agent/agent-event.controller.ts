import { Body, Controller, Request, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Roles, RoleMatchingMode } from 'nest-keycloak-connect';
import { Routes } from 'src/routes';
import { AgentEventService } from './agent-event.service';
import { AgentEvent } from 'src/model/agent-event.entity';

@Controller(`${Routes.API}`)
export class AgentEventController {

    constructor(private service: AgentEventService) { 
    }

    @Get(`/${Routes.AGENT_EVENT}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    async getBySlug(@Query() query, @Request() request) {
      return await this.service.getBySlug(query.slug, 'webhook', query.skip, query.take);
    }

    @Get(`/${Routes.AGENT_EVENT}/:id`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    async get(@Param('id') id, @Request() request) {
      return await this.service.get(id, request.user.sub);
    }

    @Post(`/${Routes.AGENT_EVENT}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    async create(@Body() dto: AgentEvent, @Request() request) {
      const entity = new AgentEvent();
      entity.id = uuidv4();
      entity.createdBy = request.user.sub;
      entity.lastChangedBy = request.user.sub;
      entity.agentSlug = dto.agentSlug;
      entity.topic = dto.topic;
      entity.payload = dto.payload;
      return await this.service.create(entity);
    }

    @Put(`/${Routes.AGENT_EVENT}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    async update(@Body() dto: AgentEvent, @Request() request) {
      const entity = new AgentEvent();
      entity.id = dto.id;
      entity.lastChangedBy = request.user.sub;
      entity.agentSlug = dto.agentSlug;
      entity.topic = dto.topic;
      entity.payload = dto.payload;
      return await this.service.update(entity);
    }

    @Delete(`/${Routes.AGENT_EVENT}/:id`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    async delete(@Param('id') id, @Request() request) {
      return await this.service.delete(id, request.user.sub);
    }
  
}
