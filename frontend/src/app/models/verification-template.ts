import * as _ from 'lodash';
import { CredentialRequest } from "./credential-request";

export class VerificationTemplate {

    id: string;
    name: string;
    organizationId: string;
    credentialRequests: CredentialRequest[];
    agentTemplateId: string;

    constructor() {
        this.id = '';
        this.name = '';
        this.organizationId = '';
        this.credentialRequests = [];
        this.agentTemplateId = '';
    }

    get isNew(): boolean {
        return this.id === '';
    }
    
    clone(): VerificationTemplate {
        return _.cloneDeep(this);
    }

    static fromDto(dto: any): VerificationTemplate {
        const template = new VerificationTemplate();
        template.id = dto.id;
        template.name = dto.name;
        template.organizationId = dto.organizationId;
        template.agentTemplateId = dto.agentTemplateId;
        for (const credentialRequest of dto.credentialRequests) template.credentialRequests.push(CredentialRequest.fromDto(credentialRequest));
        return template;
    }
}