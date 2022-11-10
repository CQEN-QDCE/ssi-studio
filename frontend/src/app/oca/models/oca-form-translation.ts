export class OcaFormTranslation {

    language: string = 'en_US';
    name: string = '';
    description: string = '';

    constructor() {
    }

    static from(json: any): OcaFormTranslation {
        const translation = new OcaFormTranslation();
        translation.language = json.language;
        translation.name = json.name;
        translation.description = json.description; 
        return translation;
    } 
}