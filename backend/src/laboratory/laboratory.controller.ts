import { Body, Controller, Request, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Laboratory } from 'src/model/laboratory.entity';
import { LaboratoryService } from './laboratory.service';
import { v4 as uuidv4 } from 'uuid';
import { Roles, RoleMatchingMode } from 'nest-keycloak-connect';
import { Routes } from 'src/routes';

@Controller(`${Routes.API}`)
export class LaboratoryController {

    constructor(private service: LaboratoryService) { 
    }

    @Get(`/${Routes.LABORATORY}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    async getAll(@Request() request) {
      return await this.service.getAll(request.user.sub);
    }

    @Get(`/${Routes.LABORATORY}/:id`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    async get(@Param('id') id, @Request() request) {
      return await this.service.get(id, request.user.sub);
    }

    @Post(`/${Routes.LABORATORY}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    async create(@Body() dto: Laboratory, @Request() request) {
      const entity = new Laboratory();
      entity.id = uuidv4();
      entity.createdBy = request.user.sub;
      entity.lastChangedBy = request.user.sub;
      entity.name = dto.name;
      entity.description = dto.description;
      return await this.service.create(entity);
    }

    @Put(`/${Routes.LABORATORY}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    async update(@Body() dto: Laboratory, @Request() request) {
      const entity = new Laboratory();
      entity.id = dto.id;
      entity.lastChangedBy = request.user.sub;
      entity.name = dto.name;
      entity.description = dto.description;
      return await this.service.update(entity);
    }

    @Delete(`/${Routes.LABORATORY}/:id`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    async delete(@Param('id') id, @Request() request) {
      return await this.service.delete(id, request.user.sub);
    }
  
}
