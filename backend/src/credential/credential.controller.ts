import { Body, Controller, Request, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Credential } from 'src/model/credential.entity';
import { CredentialService } from './credential.service';
import { v4 as uuidv4 } from 'uuid';
import { Roles, RoleMatchingMode } from 'nest-keycloak-connect';

@Controller('/api/v1')
export class CredentialController {

    constructor(private service: CredentialService) { 
    }

    @Get('organizations/:id/credentials')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async getAll(@Param('id') id, @Request() request) {
      return await this.service.getAll(id, request.user.sub);
    }

    @Get('/credentials/:id')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async get(@Param('id') id, @Request() request) {
      return await this.service.get(id, request.user.sub);
    }

    @Post('/credentials')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async create(@Body() dto: Credential, @Request() request) {
      const credential = new Credential();
      credential.id = uuidv4();
      credential.createdBy = request.user.sub;
      credential.lastChangedBy = request.user.sub;
      credential.name = dto.name;
      credential.anoncred = dto.anoncred;
      credential.credentialDefinition = dto.credentialDefinition;
      credential.ocaForm = dto.ocaForm;
      credential.organizationId = dto.organizationId;
      credential.revocable = dto.revocable;
      credential.revocationRegistrySize = dto.revocationRegistrySize;
      credential.agentTemplateId = dto.agentTemplateId;
      return await this.service.create(credential);
    }

    @Put('/credentials')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async update(@Body() dto: Credential, @Request() request) {
      const credential = new Credential();
      credential.id = dto.id;
      credential.lastChangedBy = request.user.sub;
      credential.name = dto.name;
      credential.anoncred = dto.anoncred;
      credential.credentialDefinition = dto.credentialDefinition;
      credential.ocaForm = dto.ocaForm;
      credential.organizationId = dto.organizationId;
      credential.revocable = dto.revocable;
      credential.revocationRegistrySize = dto.revocationRegistrySize;
      credential.agentTemplateId = dto.agentTemplateId;
      return await this.service.update(credential);
    }

    @Delete('/credentials/:id')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async delete(@Param('id') id, @Request() request) {
      return await this.service.delete(id, request.user.sub);
    }
  
}
