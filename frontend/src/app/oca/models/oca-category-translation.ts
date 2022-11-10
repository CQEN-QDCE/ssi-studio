export class OcaCategoryTranslation {

    language: string = 'en_US';
    name: string = '';

    constructor() {
    }

    static from(json: any): OcaCategoryTranslation {
        const translation = new OcaCategoryTranslation();
        translation.language = json.language;
        translation.name = json.name;
        return translation;
    } 
}