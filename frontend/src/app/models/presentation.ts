import { Identifier } from "./identifier";

export class Presentation {

    identifiers: Identifier[] = []

    constructor() {
    }

    toDto(): any {
        return {
            identifiers: this.identifiers
        };
    }

    static fromDto(dto: any): Presentation | null {

        if (!dto) return null;

        let presentation = new Presentation();

        for (const identifier of dto.identifiers) presentation.identifiers.push(Identifier.fromDto(identifier));
        
        return presentation;
    }
}