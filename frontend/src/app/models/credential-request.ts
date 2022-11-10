import { Restriction } from "./restriction";

export class CredentialRequest {

    requestedName: string = '';
    requestedAttributes: CredentialRequest.RequestedAttribute[] = [];
    requestedPredicates: CredentialRequest.RequestedPredicate[] = [];
    restrictions: Restriction[] = [];
    
    constructor() { 
    }

    static fromDto(dto: any): CredentialRequest {
        const credentialRequest = new CredentialRequest();
        
        credentialRequest.requestedName = dto.requestedName;
        for (const requestedAttribute of dto.requestedAttributes) credentialRequest.requestedAttributes.push(CredentialRequest.RequestedAttribute.fromDto(requestedAttribute));
        for (const requestedPredicate of dto.requestedPredicates) credentialRequest.requestedPredicates.push(CredentialRequest.RequestedPredicate.fromDto(requestedPredicate));
        for (const restriction of dto.restrictions) credentialRequest.restrictions.push(Restriction.fromDto(restriction));
        
        return credentialRequest;
    }
}

export module CredentialRequest {
  
    export class RequestedAttribute {

        name: string = '';
    
        static fromDto(dto: any): CredentialRequest.RequestedAttribute {
            let requestedAttribute = new CredentialRequest.RequestedAttribute();
    
            requestedAttribute.name = dto.name;
            
            return requestedAttribute;
        }
    }

    export class RequestedPredicate {

        name: string = '';
        condition: string = '>';
        value: number | null = null;
    
        static fromDto(dto: any): CredentialRequest.RequestedPredicate {
            let requestedPredicate = new CredentialRequest.RequestedPredicate();
    
            requestedPredicate.name = dto.name;
            requestedPredicate.condition = dto.condition;
            requestedPredicate.value = dto.value;
    
            return requestedPredicate;
        }
    }
}
