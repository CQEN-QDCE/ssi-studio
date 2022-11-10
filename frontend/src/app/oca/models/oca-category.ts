import { OcaAttribute } from "./oca-attribute";
import { OcaCategoryTranslation } from "./oca-category-translation";

export class OcaCategory {

    id: number = 0;
    name: string = 'Category';
    attributes: OcaAttribute[] = [];
    translations: OcaCategoryTranslation[] = [];

    constructor() {
    }

    static from(json: any): OcaCategory {
        const category = new OcaCategory();
        category.id = json.id;
        category.name = json.name;
        for (const attribute of json.attributes) category.attributes.push(OcaAttribute.from(attribute));
        for (const translation of json.translations) category.translations.push(OcaCategoryTranslation.from(translation));
        return category;
    } 

    addTranslation(language: string): void {
        let index = this.translations.findIndex((t) => t.language === language);
        if (index === -1) { 
            const translation = new OcaCategoryTranslation();
            translation.language = language;
            this.translations.push(translation);
        }
    }

    initLanguage(language: string): void {
        let index = this.translations.findIndex((t) => t.language === language);
        this.name = this.translations[index].name;
    }

    saveLanguage(language: string): void {
        let index = this.translations.findIndex((t) => t.language === language);
        if (index >= 0) {
            this.translations[index].name = this.name;
        }
    }

    translate(currentLanguage: string, newLanguage: string): void {
        this.saveLanguage(currentLanguage);
        this.initLanguage(newLanguage);
    }
}