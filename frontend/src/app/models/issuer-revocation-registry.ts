import { RevocationRegistryType } from "./revocation-registry-type.enum";

export class IssuerRevocationRegistry {

    credentialDefinitionId: string;
    errorMessage: string;
    issuerDid: string;
    maxCredentialNumber: number;
    pendingPublications: string[];
    recordId: string;
    revocationRegistryType: RevocationRegistryType;
    revocationRegistryDefinition: any;
    revocationRegistryEntry: any;
    revocationRegistryIdentifier: string;
    state: string;
    tag: string;
    tailsHash: string;
    tailsLocalPath: string;
    tailsPublicUri: string;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
        this.credentialDefinitionId = '';
        this.errorMessage = '';
        this.issuerDid = '';
        this.maxCredentialNumber = 0;
        this.pendingPublications = [];
        this.recordId = '';
        this.revocationRegistryType = RevocationRegistryType.ClAccumulator;
        this.revocationRegistryIdentifier = '';
        this.state = '';
        this.tag = '';
        this.tailsHash = '';
        this.tailsLocalPath = '';
        this.tailsPublicUri = '';
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    static fromDto(dto: any): IssuerRevocationRegistry {
        let issuerRevocationRegistry = new IssuerRevocationRegistry();
        issuerRevocationRegistry.credentialDefinitionId = dto.cred_def_id;
        issuerRevocationRegistry.errorMessage = dto.error_msg;
        issuerRevocationRegistry.issuerDid = dto.issuer_did;
        issuerRevocationRegistry.maxCredentialNumber = dto.max_cred_num;
        issuerRevocationRegistry.pendingPublications = dto.pending_pub;
        issuerRevocationRegistry.recordId = dto.record_id;
        issuerRevocationRegistry.revocationRegistryType = dto.revoc_def_type;
        issuerRevocationRegistry.revocationRegistryIdentifier = dto.revoc_reg_id;
        issuerRevocationRegistry.state = dto.state;
        issuerRevocationRegistry.tag = dto.tag;
        issuerRevocationRegistry.tailsHash = dto.tails_hash;
        issuerRevocationRegistry.tailsLocalPath = dto.tails_local_path;
        issuerRevocationRegistry.tailsPublicUri = dto.tails_public_uri;
        issuerRevocationRegistry.createdAt = new Date(dto.created_at);
        issuerRevocationRegistry.updatedAt = new Date(dto.updated_at);
        return issuerRevocationRegistry;
    }
}