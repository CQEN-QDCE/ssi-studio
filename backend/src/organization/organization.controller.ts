import { Body, Controller, Request, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Organization } from 'src/model/organization.entity';
import { OrganizationService } from './organization.service';
import { v4 as uuidv4 } from 'uuid';
import {
  Roles,
  RoleMatchingMode
} from 'nest-keycloak-connect';

@Controller('/api/v1')
export class OrganizationController {

    constructor(private service: OrganizationService) { 
    }

    @Get('/organizations')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async getAll(@Request() request) {
      return await this.service.getAll();
    }

    @Get('/organizations/:id')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async get(@Param('id') id) {
      return await this.service.get(id);
    }

    @Post('/organizations')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async create(@Body() dto: Organization) {
      const organization = new Organization();
      organization.id = uuidv4();
      organization.createdBy = 'me';
      organization.lastChangedBy = 'me';
      organization.name = dto.name;
      organization.description = dto.description;
      return await this.service.create(organization);
    }

    @Put('/organizations')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async update(@Body() dto: Organization) {
      const organization = new Organization();
      organization.id = dto.id;
      organization.lastChangedBy = dto.lastChangedBy;
      organization.name = dto.name;
      organization.description = dto.description;
      return await this.service.update(organization);
    }

    @Delete('/organizations/:id')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async delete(@Param('id') id) {
      return await this.service.delete(id);
    }
  
}
