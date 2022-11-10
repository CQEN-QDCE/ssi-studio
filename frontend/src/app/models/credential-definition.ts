export class CredentialDefinition {

    public id: string = '';
    public schemaId: string = '';
    public tag: string = '';
    public type: number = 0;
    public value: any = '';
    public version: string = '';

    constructor() {
    }

    public clone(): CredentialDefinition {
        const clone = new CredentialDefinition();
        return clone;
    }

    static fromDto(dto: any): CredentialDefinition {
        let credentialDefinition = new CredentialDefinition();
        credentialDefinition.id = dto.id;
        credentialDefinition.schemaId = dto.schemaId;
        credentialDefinition.tag = dto.tag;
        credentialDefinition.type = dto.type;
        credentialDefinition.value = dto.value;
        credentialDefinition.version = dto.version;
        return credentialDefinition;
    }
}