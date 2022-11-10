export class CredentialDefinitionId {

    public did: string = '';
    public signatureType: string = 'CL';
    public marker: number = 3;
    public schemaId: string = '';
    public tag: string = '';

    constructor() {
    }

    public static parse(value: string): CredentialDefinitionId {
        const credentialDefinitionId = new CredentialDefinitionId();
        const parts: string[] = value.split(':');
        if (parts.length === 4) {
            // Th7MpTaRZVRYnPiabds81Y:3:CL:1
            credentialDefinitionId.did = parts[0];
            credentialDefinitionId.marker = parseInt(parts[1]);
            credentialDefinitionId.signatureType = parts[2];
            credentialDefinitionId.schemaId = parts[3];
        }
        if (parts.length === 5) {
            // Th7MpTaRZVRYnPiabds81Y:3:CL:1:tag
            credentialDefinitionId.did = parts[0];
            credentialDefinitionId.marker = parseInt(parts[1]);
            credentialDefinitionId.signatureType = parts[2];
            credentialDefinitionId.schemaId = parts[3];
            credentialDefinitionId.tag = parts[4];
        }
        if (parts.length === 7) {
            // NcYxiDXkpYi6ov5FcYDi1e:3:CL:NcYxiDXkpYi6ov5FcYDi1e:2:gvt:1.0
            credentialDefinitionId.did = parts[0];
            credentialDefinitionId.marker = parseInt(parts[1]);
            credentialDefinitionId.schemaId = parts.slice(3,7).join(':');
        }
        if (parts.length === 8) {
            // NcYxiDXkpYi6ov5FcYDi1e:3:CL:NcYxiDXkpYi6ov5FcYDi1e:2:gvt:1.0:tag
            credentialDefinitionId.did = parts[0];
            credentialDefinitionId.marker = parseInt(parts[1]);
            credentialDefinitionId.schemaId = parts.slice(3,7).join(':');
            credentialDefinitionId.tag = parts[7];
        }
        if (parts.length === 9) {
            // creddef:sov:did:sov:NcYxiDXkpYi6ov5FcYDi1e:3:CL:3:tag
            credentialDefinitionId.did = parts.slice(2,5).join(':');
            credentialDefinitionId.marker = parseInt(parts[5]);
            credentialDefinitionId.signatureType = parts[6];
            credentialDefinitionId.schemaId = parts[7];
            credentialDefinitionId.tag = parts[8];
        }
        if (parts.length === 16) {
            // creddef:sov:did:sov:NcYxiDXkpYi6ov5FcYDi1e:3:CL:schema:sov:did:sov:NcYxiDXkpYi6ov5FcYDi1e:2:gvt:1.0:tag
            credentialDefinitionId.did = parts.slice(2,5).join(':');
            credentialDefinitionId.marker = parseInt(parts[5]);
            credentialDefinitionId.signatureType = parts[6];
            credentialDefinitionId.schemaId = parts.slice(7,15).join(':');
            credentialDefinitionId.tag = parts[15];
        }

        return credentialDefinitionId;
    }

    public toString(): string {
        return `${this.did}:${this.marker}:${this.signatureType}:${this.schemaId}:${this.tag}`
    }
}
