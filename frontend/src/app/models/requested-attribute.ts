import { NonRevoked } from "./non-revoked";
import { Restriction } from "./restriction";

export class RequestedAttribute {

    id: string = '';
    name: string = '';
    names: string[] = [];
    restrictions: Restriction[] = [];
    nonRevoked: NonRevoked = new NonRevoked();

    static fromDto(dto: any): RequestedAttribute {
        let requestedAttribute = new RequestedAttribute();

        requestedAttribute.id = dto.id;
        requestedAttribute.name = dto.name;
        requestedAttribute.names = dto.names;
        for (const restriction of dto.restrictions) requestedAttribute.restrictions.push(Restriction.fromDto(restriction));
        
        return requestedAttribute;
    }
}