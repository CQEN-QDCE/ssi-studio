import { Body, Controller, Request, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Verification } from 'src/model/verification.entity';
import { VerificationService } from './verification.service';
import { v4 as uuidv4 } from 'uuid';
import { Roles, RoleMatchingMode } from 'nest-keycloak-connect';

@Controller('/api/v1')
export class VerificationController {

    constructor(private service: VerificationService) { 
    }

    @Get('organizations/:id/verifications')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async getAll(@Param('id') id, @Request() request) {
      return await this.service.getAll(id, request.user.sub);
    }

    @Get('/verifications/:id')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async get(@Param('id') id, @Request() request) {
      return await this.service.get(id, request.user.sub);
    }

    @Post('/verifications')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async create(@Body() dto: Verification, @Request() request) {
      const verification = new Verification();
      verification.id = uuidv4();
      verification.createdBy = request.user.sub;
      verification.lastChangedBy = request.user.sub;
      verification.name = dto.name;
      verification.organizationId = dto.organizationId;
      verification.credentialRequests = dto.credentialRequests;
      verification.agentTemplateId = dto.agentTemplateId;
      return await this.service.create(verification);
    }

    @Put('/verifications')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async update(@Body() dto: Verification, @Request() request) {
      const verification = new Verification();
      verification.id = dto.id;
      verification.lastChangedBy = request.user.sub;
      verification.name = dto.name;
      verification.organizationId = dto.organizationId;
      verification.credentialRequests = dto.credentialRequests;
      verification.agentTemplateId = dto.agentTemplateId;
      return await this.service.update(verification);
    }

    @Delete('/verifications/:id')
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async delete(@Param('id') id, @Request() request) {
      return await this.service.delete(id, request.user.sub);
    }
  
}
