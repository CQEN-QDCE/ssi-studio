import { Body, Controller, Request, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Verification } from 'src/model/verification.entity';
import { VerificationService } from './verification.service';
import { v4 as uuidv4 } from 'uuid';
import { Roles, RoleMatchingMode } from 'nest-keycloak-connect';
import { Routes } from 'src/routes';

@Controller(`${Routes.API}`)
export class VerificationController {

    constructor(private service: VerificationService) { 
    }

    @Get(`/${Routes.LABORATORY}/:id/${Routes.VERIFICATION}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async getAll(@Param('id') id, @Request() request) {
      return await this.service.getAll(id, request.user.sub);
    }

    @Get(`/${Routes.VERIFICATION}/:id`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async get(@Param('id') id, @Request() request) {
      return await this.service.get(id, request.user.sub);
    }

    @Post(`/${Routes.VERIFICATION}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async create(@Body() dto: Verification, @Request() request) {
      const entity = new Verification();
      entity.id = uuidv4();
      entity.createdBy = request.user.sub;
      entity.lastChangedBy = request.user.sub;
      entity.name = dto.name;
      entity.laboratoryId = dto.laboratoryId;
      entity.credentialRequests = dto.credentialRequests;
      entity.agentTemplateId = dto.agentTemplateId;
      return await this.service.create(entity);
    }

    @Put(`/${Routes.VERIFICATION}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async update(@Body() dto: Verification, @Request() request) {
      const entity = new Verification();
      entity.id = dto.id;
      entity.lastChangedBy = request.user.sub;
      entity.name = dto.name;
      entity.laboratoryId = dto.laboratoryId;
      entity.credentialRequests = dto.credentialRequests;
      entity.agentTemplateId = dto.agentTemplateId;
      return await this.service.update(entity);
    }

    @Delete(`/${Routes.VERIFICATION}/:id`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async delete(@Param('id') id, @Request() request) {
      return await this.service.delete(id, request.user.sub);
    }
  
}
