import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'restriction',
  pure: false
})

export class RestrictionPipe implements PipeTransform {

    constructor(private readonly translate: TranslateService) {
    }

  transform(type: string, args?: any): string {

    if (!type) return '';

    switch (type?.toLowerCase()) {
        case 'cred_def_id':
          return this.translate.instant('CredentialDefinitionIdRestriction');
        case 'issuer_did':
            return this.translate.instant('IssuerDidRestriction');
        case 'schema_id':
          return this.translate.instant('SchemaIdRestriction');
        case 'schema_issuer_did':
          return this.translate.instant('SchemaIssuerDidRestriction');
        case 'schema_name':
          return this.translate.instant('SchemaNameRestriction');
        case 'schema_version':
          return this.translate.instant('SchemaVersionRestriction');
        default:
          throw 'Invalid restriction type value: ' + type;
      }
  }
}