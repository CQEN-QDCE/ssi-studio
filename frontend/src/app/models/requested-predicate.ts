import { NonRevoked } from "./non-revoked";
import { Restriction } from "./restriction";

export class RequestedPredicate {

    id: string = '';
    name: string = '';
    condition: string = '>';
    value: number | null = null;
    restrictions: Restriction[] = [];
    nonRevoked: NonRevoked = new NonRevoked();

    static fromDto(dto: any): RequestedPredicate {
        let requestedPredicate = new RequestedPredicate();

        requestedPredicate.id = dto.id;
        requestedPredicate.name = dto.name;
        requestedPredicate.condition = dto.condition;
        requestedPredicate.value = dto.value;
        for (const restriction of dto.restrictions) requestedPredicate.restrictions.push(Restriction.fromDto(restriction));

        return requestedPredicate;
    }
}