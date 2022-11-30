import { Body, Controller, Request, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Credential } from 'src/model/credential.entity';
import { CredentialService } from './credential.service';
import { v4 as uuidv4 } from 'uuid';
import { Roles, RoleMatchingMode } from 'nest-keycloak-connect';
import { Routes } from 'src/routes';

@Controller(`${Routes.API}`)
export class CredentialController {

    constructor(private service: CredentialService) { 
    }

    @Get(`/${Routes.LABORATORY}/:id/${Routes.CREDENTIAL}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async getAll(@Param('id') id, @Request() request) {
      return await this.service.getAll(id, request.user.sub);
    }

    @Get(`/${Routes.CREDENTIAL}/:id`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async get(@Param('id') id, @Request() request) {
      return await this.service.get(id, request.user.sub);
    }

    @Post(`/${Routes.CREDENTIAL}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async create(@Body() dto: Credential, @Request() request) {
      const entity = new Credential();
      entity.id = uuidv4();
      entity.createdBy = request.user.sub;
      entity.lastChangedBy = request.user.sub;
      entity.name = dto.name;
      entity.anoncred = dto.anoncred;
      entity.credentialDefinition = dto.credentialDefinition;
      entity.ocaForm = dto.ocaForm;
      entity.laboratoryId = dto.laboratoryId;
      entity.revocable = dto.revocable;
      entity.revocationRegistrySize = dto.revocationRegistrySize;
      entity.agentTemplateId = dto.agentTemplateId;
      return await this.service.create(entity);
    }

    @Put(`/${Routes.CREDENTIAL}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async update(@Body() dto: Credential, @Request() request) {
      const entity = new Credential();
      entity.id = dto.id;
      entity.lastChangedBy = request.user.sub;
      entity.name = dto.name;
      entity.anoncred = dto.anoncred;
      entity.credentialDefinition = dto.credentialDefinition;
      entity.ocaForm = dto.ocaForm;
      entity.laboratoryId = dto.laboratoryId;
      entity.revocable = dto.revocable;
      entity.revocationRegistrySize = dto.revocationRegistrySize;
      entity.agentTemplateId = dto.agentTemplateId;
      return await this.service.update(entity);
    }

    @Delete(`/${Routes.CREDENTIAL}/:id`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async delete(@Param('id') id, @Request() request) {
      return await this.service.delete(id, request.user.sub);
    }
  
}
