import { Body, Controller, Request, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Agent } from 'src/model/agent.entity';
import { AgentService } from './agent.service';
import { v4 as uuidv4 } from 'uuid';
import { Roles, RoleMatchingMode } from 'nest-keycloak-connect';
import { Routes } from 'src/routes';

@Controller(`${Routes.API}`)
export class AgentController {

    constructor(private service: AgentService) { 
    }

    @Get(`/${Routes.LABORATORY}/:id/${Routes.AGENT}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    async getAll(@Param('id') id, @Request() request) {
      return await this.service.getAll(id, request.user.sub);
    }

    @Get(`/${Routes.AGENT}/:id`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    async get(@Param('id') id, @Request() request) {
      return await this.service.get(id, request.user.sub);
    }

    @Post(`/${Routes.AGENT}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    async create(@Body() dto: Agent, @Request() request) {
      const entity = new Agent();
      entity.id = uuidv4();
      entity.createdBy = request.user.sub;
      entity.lastChangedBy = request.user.sub;
      entity.name = dto.name;
      entity.laboratoryId = dto.laboratoryId;
      entity.url = dto.url;
      entity.apiKey = dto.apiKey;
      return await this.service.create(entity);
    }

    @Put(`/${Routes.AGENT}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    async update(@Body() dto: Agent, @Request() request) {
      const entity = new Agent();
      entity.id = dto.id;
      entity.lastChangedBy = request.user.sub;
      entity.name = dto.name;
      entity.laboratoryId = dto.laboratoryId;
      entity.url = dto.url;
      entity.apiKey = dto.apiKey;
      return await this.service.update(entity);
    }

    @Delete(`/${Routes.AGENT}/:id`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    async delete(@Param('id') id, @Request() request) {
      return await this.service.delete(id, request.user.sub);
    }
  
}
