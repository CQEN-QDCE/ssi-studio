export class CredentialProposalResponse {

    public autoIssue: boolean = false;
    public autoOffer: boolean = false;
    public autoRemove: boolean = false;
    public connectionId: string = '';
    public createdAt: Date = new Date();
    public credential: any = {};
    public credentialDefinitionId:  string = '';
    public credentialExchangeId:  string = '';
    public credentialId:  string = '';
    public credentialOffer: any = {};
    public credentialOfferDict: any = {};
    public credentialProposalDict: any = {};
    public credentialRequest: any = {};
    public credentialRequestMetadata: any = {};
    public errorMessage:  string = '';
    public initiator:  string = '';
    public parentThreadId:  string = '';
    public rawCredential: any = {};
    public revocRegId:  string = '';
    public revocationId:  string = '';
    public role:  string = '';
    public schemaId:  string = '';
    public state:  string = '';
    public threadId:  string = '';
    public trace: boolean = false;
    public updatedAt: Date = new Date();

    constructor() {
    }
}
