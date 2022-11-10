import { NonRevoked } from "./non-revoked";
import { RequestedAttribute } from "./requested-attribute";
import { RequestedPredicate } from "./requested-predicate";

export class ProofRequest {

    name: string = '';
    
    version: string = '';
    
    requestedAttributes: RequestedAttribute[] = [];

    requestedPredicates: RequestedPredicate[] = [];

    nonRevoked: NonRevoked = new NonRevoked();

    static fromDto(dto: any): ProofRequest {
        let proofRequest = new ProofRequest();
        proofRequest.name = dto.name;
        proofRequest.version = dto.version;
        for (const requestedAttribute of dto.requestedAttributes) {
            proofRequest.requestedAttributes.push(RequestedAttribute.fromDto(requestedAttribute));
        }
        for (const requestedPredicate of dto.requestedPredicates) {
            proofRequest.requestedPredicates.push(RequestedPredicate.fromDto(requestedPredicate));
        }
        return proofRequest;
    }
}