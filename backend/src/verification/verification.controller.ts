import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Verification } from 'src/model/verification.entity';
import { VerificationService } from './verification.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('/api/v1')
export class VerificationController {

    constructor(private service: VerificationService) { 
    }

    @Get('organizations/:id/verifications')
    public async getAll(@Param('id') id) {
      return await this.service.getAll(id);
    }

    @Get('/verifications/:id')
    public async get(@Param('id') id) {
      return await this.service.get(id);
    }

    @Post('/verifications')
    public async create(@Body() dto: Verification) {
      const verification = new Verification();
      verification.id = uuidv4();
      verification.createdBy = 'me';
      verification.lastChangedBy = 'me';
      verification.name = dto.name;
      verification.organizationId = dto.organizationId;
      verification.credentialRequests = dto.credentialRequests;
      verification.agentTemplateId = dto.agentTemplateId;
      return await this.service.create(verification);
    }

    @Put('/verifications')
    public async update(@Body() dto: Verification) {
      const verification = new Verification();
      verification.id = dto.id;
      verification.lastChangedBy = dto.lastChangedBy;
      verification.name = dto.name;
      verification.organizationId = dto.organizationId;
      verification.credentialRequests = dto.credentialRequests;
      verification.agentTemplateId = dto.agentTemplateId;
      return await this.service.update(verification);
    }

    @Delete('/verifications/:id')
    public async delete(@Param('id') id) {
      return await this.service.delete(id);
    }
  
}
