import { Body, Controller, Request, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Connection } from 'src/model/connection.entity';
import { ConnectionService } from './connection.service';
import { v4 as uuidv4 } from 'uuid';
import { Roles, RoleMatchingMode } from 'nest-keycloak-connect';

@Controller('/api/v1')
export class ConnectionController {

    constructor(private service: ConnectionService) { 
    }

    @Get('organizations/:id//connections')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async getAll(@Param('id') id, @Request() request) {
      return await this.service.getAll(id, request.user.sub);
    }

    @Get('/connections/:id')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async get(@Param('id') id, @Request() request) {
      return await this.service.get(id, request.user.sub);
    }

    @Post('/connections')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async create(@Body() dto: Connection, @Request() request) {
      const connection = new Connection();
      connection.id = uuidv4();
      connection.createdBy = request.user.sub;
      connection.lastChangedBy = request.user.sub;
      connection.name = dto.name;
      return await this.service.create(connection);
    }

    @Put('/connections')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async update(@Body() dto: Connection, @Request() request) {
      const connection = new Connection();
      connection.id = dto.id;
      connection.lastChangedBy = request.user.sub;
      connection.name = dto.name;
      return await this.service.update(connection);
    }

    @Delete('/connections/:id')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async delete(@Param('id') id, @Request() request) {
      return await this.service.delete(id, request.user.sub);
    }
  
}
