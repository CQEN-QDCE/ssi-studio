export class CreateCredentialDefinitionRequest {

    public supportRevocation: boolean = false;
    public revocationRegistrySize: number | null = null;
    public schemaId: string = '';
    public tag: string = '';

    constructor() {
    }
}
