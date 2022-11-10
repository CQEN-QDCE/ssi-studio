import { RestrictionType, RestrictionTypeConvert } from "./restriction-type.enum";

export class Restriction {

    type: RestrictionType = RestrictionType.CredentialDefinitionId;
    value: string | null = null;

    constructor() {
    }

    static fromDto(dto: any): Restriction {
        let restriction = new Restriction();

        restriction.type = RestrictionTypeConvert.parse(dto.type);
        restriction.value = dto.value;
        
        return restriction;
    }
}
