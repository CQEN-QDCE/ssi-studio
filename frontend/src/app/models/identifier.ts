import { CredentialDefinitionId } from "./credential-definition-id";
import { SchemaId } from "./schema-id";

export class Identifier {

    credentialDefinitionId: CredentialDefinitionId | null = null;

    schemaId: SchemaId | null = null;

    revRegId: any | null = null;

    timestamp: any | null = null;

    constructor() {
    }

    toDto(): any {
        return {
            cred_def_id: this.credentialDefinitionId?.toString() || null,
            schema_id: this.schemaId?.toString() || null,
            rev_reg_id: this.revRegId,
            timestamp: this.timestamp
        };
    }

    static fromDto(dto: any): Identifier {

        let identifier = new Identifier();

        identifier.credentialDefinitionId = CredentialDefinitionId.parse(dto.cred_def_id);
        identifier.schemaId = SchemaId.parse(dto.schema_id);
        identifier.revRegId = dto.rev_reg_id;
        identifier.timestamp = dto.timestamp;
        
        return identifier;
    }
}