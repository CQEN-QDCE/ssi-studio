import * as _ from 'lodash';
import { CredentialDefinition } from "./credential-definition";
import { Schema } from "./schema";
import { OcaForm } from "../oca/models/oca-form";

export class CredentialTemplate {

    id: string;
    name: string;
    description: string;
    laboratoryId: string;
    anoncred: Schema;
    credentialDefinition: CredentialDefinition;
    ocaForm: OcaForm | null = null;
    revocable: boolean = false;
    revocationRegistrySize: number = 1000;
    agentTemplateId: string;

    constructor() {
        this.id = '';
        this.name = '';
        this.description = '';
        this.laboratoryId = '';
        this.anoncred = new Schema();
        this.credentialDefinition = new CredentialDefinition();
        this.agentTemplateId = '';
    }

    get type(): string {
        return this.ocaForm ? 'OCA' : 'Indy';
    }

    get isPublished(): boolean {
        return this.credentialDefinition.id !== '';
    }

    get isNew(): boolean {
        return this.id === '';
    }

    static fromDto(dto: any): CredentialTemplate {
        let template = new CredentialTemplate();
        template.id = dto.id;
        template.name = dto.name;
        template.description = dto.description;
        template.laboratoryId = dto.laboratoryId;
        template.revocable = dto.revocable;
        template.revocationRegistrySize = dto.revocationRegistrySize;
        template.anoncred = Schema.fromDto(dto.anoncred);
        template.agentTemplateId = dto.agentTemplateId;
        if (dto.credentialDefinition) template.credentialDefinition = CredentialDefinition.fromDto(dto.credentialDefinition);
        if (dto.ocaForm) template.ocaForm = OcaForm.from(dto.ocaForm);
        return template;
    }

    clone(): CredentialTemplate {
        return _.cloneDeep(this);
    }
}