import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IssueCredentialService } from './issue-credential.service';
import { v4 as uuidv4 } from 'uuid';
import { IssueCredential } from 'src/model/issue-credential.entity';

@Controller('/api/v1')
export class IssueCredentialController {

    constructor(private service: IssueCredentialService) { 
    }

    @Get('agents/:id/issue-credentials')
    public async getAll(@Param('id') id) {
      return await this.service.getAll(id);
    }

    @Get('/issue-credentials/:id')
    public async get(@Param('id') id) {
      return await this.service.get(id);
    }

    @Post('/issue-credentials')
    public async create(@Body() dto: IssueCredential) {
      const issueCredential = new IssueCredential();
      issueCredential.id = uuidv4();
      issueCredential.createdBy = 'me';
      issueCredential.lastChangedBy = 'me';
      issueCredential.name = dto.name;
      issueCredential.credentialPreview = dto.credentialPreview;
      issueCredential.credentialExchangeId = dto.credentialExchangeId;
      issueCredential.revocable = dto.revocable;
      issueCredential.revoked = dto.revoked;
      issueCredential.agentTemplateId = dto.agentTemplateId;
      return await this.service.create(issueCredential);
    }

    @Put('/issue-credentials')
    public async update(@Body() dto: IssueCredential) {
      const issueCredential = new IssueCredential();
      issueCredential.id = dto.id;
      issueCredential.lastChangedBy = dto.lastChangedBy;
      issueCredential.name = dto.name;
      issueCredential.credentialPreview = dto.credentialPreview;
      issueCredential.credentialExchangeId = dto.credentialExchangeId;
      issueCredential.revocable = dto.revocable;
      issueCredential.revoked = dto.revoked;
      issueCredential.agentTemplateId = dto.agentTemplateId;
      return await this.service.update(issueCredential);
    }

    @Delete('/issue-credentials/:id')
    public async delete(@Param('id') id) {
      return await this.service.delete(id);
    }
  
}
