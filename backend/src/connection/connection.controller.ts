import { Body, Controller, Request, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Connection } from 'src/model/connection.entity';
import { ConnectionService } from './connection.service';
import { v4 as uuidv4 } from 'uuid';
import { Roles, RoleMatchingMode } from 'nest-keycloak-connect';
import { Routes } from 'src/routes';

@Controller(`${Routes.API}`)
export class ConnectionController {

    constructor(private service: ConnectionService) { 
    }

    @Get(`/${Routes.LABORATORY}/:id/${Routes.CONNECTION}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async getAll(@Param('id') id, @Request() request) {
      return await this.service.getAll(id, request.user.sub);
    }

    @Get(`/${Routes.CONNECTION}/:id`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async get(@Param('id') id, @Request() request) {
      return await this.service.get(id, request.user.sub);
    }

    @Post(`/${Routes.CONNECTION}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async create(@Body() dto: Connection, @Request() request) {
      const entity = new Connection();
      entity.id = uuidv4();
      entity.createdBy = request.user.sub;
      entity.lastChangedBy = request.user.sub;
      entity.name = dto.name;
      return await this.service.create(entity);
    }

    @Put(`/${Routes.CONNECTION}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async update(@Body() dto: Connection, @Request() request) {
      const entity = new Connection();
      entity.id = dto.id;
      entity.lastChangedBy = request.user.sub;
      entity.name = dto.name;
      return await this.service.update(entity);
    }

    @Delete(`/${Routes.CONNECTION}/:id`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async delete(@Param('id') id, @Request() request) {
      return await this.service.delete(id, request.user.sub);
    }
  
}
