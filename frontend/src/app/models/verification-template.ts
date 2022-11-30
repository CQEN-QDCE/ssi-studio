import * as _ from 'lodash';
import { CredentialRequest } from "./credential-request";

export class VerificationTemplate {

    id: string;
    name: string;
    laboratoryId: string;
    credentialRequests: CredentialRequest[];
    agentTemplateId: string;

    constructor() {
        this.id = '';
        this.name = '';
        this.laboratoryId = '';
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
        template.laboratoryId = dto.laboratoryId;
        template.agentTemplateId = dto.agentTemplateId;
        for (const credentialRequest of dto.credentialRequests) template.credentialRequests.push(CredentialRequest.fromDto(credentialRequest));
        return template;
    }
}