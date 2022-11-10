import { CredentialPreview } from "./credential-preview";

export class CredentialProposalRequest {

    public autoRemove: boolean = false;
    public comment: string | null = null;
    public connectionId: string | null = null;
    public credentialDefinitionId: string | null = null;
    public credentialProposal: CredentialPreview = new CredentialPreview();
    public issuerDid: string | null = null;
    public schemaId: string | null = null;
    public schemaIssuerDid: string | null = null;
    public schemaName: string | null = null;
    public schemaVersion: string | null = null;
    public trace: boolean = false;

    constructor() {
    }
}
