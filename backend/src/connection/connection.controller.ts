import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Connection } from 'src/model/connection.entity';
import { ConnectionService } from './connection.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('/api/v1')
export class ConnectionController {

    constructor(private service: ConnectionService) { 
    }

    @Get('organizations/:id//connections')
    public async getAll(@Param('id') id) {
      return await this.service.getAll(id);
    }

    @Get('/connections/:id')
    public async get(@Param('id') id) {
      return await this.service.get(id);
    }

    @Post('/connections')
    public async create(@Body() dto: Connection) {
      const connection = new Connection();
      connection.id = uuidv4();
      connection.createdBy = 'me';
      connection.lastChangedBy = 'me';
      connection.name = dto.name;
      return await this.service.create(connection);
    }

    @Put('/connections')
    public async update(@Body() dto: Connection) {
      const connection = new Connection();
      connection.id = dto.id;
      connection.lastChangedBy = dto.lastChangedBy;
      connection.name = dto.name;
      return await this.service.update(connection);
    }

    @Delete('/connections/:id')
    public async delete(@Param('id') id) {
      return await this.service.delete(id);
    }
  
}
