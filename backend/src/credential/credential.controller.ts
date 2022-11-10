import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Credential } from 'src/model/credential.entity';
import { CredentialService } from './credential.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('/api/v1')
export class CredentialController {

    constructor(private service: CredentialService) { 
    }

    @Get('organizations/:id/credentials')
    public async getAll(@Param('id') id) {
      return await this.service.getAll(id);
    }

    @Get('/credentials/:id')
    public async get(@Param('id') id) {
      return await this.service.get(id);
    }

    @Post('/credentials')
    public async create(@Body() dto: Credential) {
      const credential = new Credential();
      credential.id = uuidv4();
      credential.createdBy = 'me';
      credential.lastChangedBy = 'me';
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
    public async update(@Body() dto: Credential) {
      const credential = new Credential();
      credential.id = dto.id;
      credential.lastChangedBy = dto.lastChangedBy;
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
    public async delete(@Param('id') id) {
      return await this.service.delete(id);
    }
  
}
