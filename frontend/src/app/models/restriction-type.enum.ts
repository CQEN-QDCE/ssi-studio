export enum RestrictionType {
    CredentialDefinitionId = 'cred_def_id',
    IssuerDid = 'issuer_did',
    SchemaId = 'schema_id',
    SchemaIssuerDid = 'schema_issuer_did',
    SchemaName = 'schema_name',
    SchemaVersion = 'schema_version'
}

export class RestrictionTypeConvert {
    
    static parse(value: string): RestrictionType {
      switch (value?.toLowerCase()) {
        case 'cred_def_id':
          return RestrictionType.CredentialDefinitionId;
        case 'issuer_did':
            return RestrictionType.IssuerDid;
        case 'schema_id':
          return RestrictionType.SchemaId;
        case 'schema_issuer_did':
          return RestrictionType.SchemaIssuerDid;
        case 'schema_name':
          return RestrictionType.SchemaName;
        case 'schema_version':
          return RestrictionType.SchemaVersion;
        default:
          throw 'Invalid restriction type value: ' + value;
      }
    }
}