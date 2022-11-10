import { OcaAttributeTranslation } from "./oca-attribute-translation";
import { OcaCategory } from "./oca-category";
import { OcaCategoryTranslation } from "./oca-category-translation";
import { OcaFormTranslation } from "./oca-form-translation";

export class OcaForm {

    uuid: string = '';
    name: string = '';
    description: string = '';
    categories: OcaCategory[] = [];
    languages: string[] = [];
    classification: string = ''
    translations: OcaFormTranslation[] = [];
    
    constructor() {
    }

    static from(json: any): OcaForm {
        const form = new OcaForm();
        form.uuid = json.uuid;
        form.name = json.name;
        form.description = json.description;
        for (const category of json.categories) form.categories.push(OcaCategory.from(category));
        for (const translation of json.translations) form.translations.push(OcaFormTranslation.from(translation));
        form.languages = json.languages;
        form.classification = json.classification;
        return form;
    } 

    addCategory(name: string = ''): void {
        const category = new OcaCategory();
        category.name = name;
        for (const language of this.languages) {
            category.addTranslation(language);
        }
        this.categories.push(category);
        this.categories = [...this.categories];
    }

    removeCategory(name: string): void {
        //this.ca
    }

    initLanguage(language: string): void {  
        let index = this.translations.findIndex((t) => t.language === language);
        this.name = this.translations[index].name;
        this.description = this.translations[index].description;
        for (const category of this.categories) {
            category.initLanguage(language);
            for (const attribute of category.attributes) {
                attribute.initLanguage(language);
            }
        }
    } 

    saveLanguage(language: string): void {  
        let index = this.translations.findIndex((t) => t.language === language); 
        if (index >= 0) {
            this.translations[index].name = this.name;
            this.translations[index].description = this.description;
        }
        for (const category of this.categories) {
            category.saveLanguage(language);
            for (const attribute of category.attributes) {
                attribute.saveLanguage(language);
            }
        }
    } 

    translate(currentLanguage: string, newLanguage: string): void {   
        this.saveLanguage(currentLanguage);
        this.initLanguage(newLanguage);
    } 

    addLanguage(language: string): void {
        if (!this.languages.some(l => l === language)) {
            this.languages.push(language);
            if (!this.translations.some(t => t.language === language)) {
                const translation = new OcaFormTranslation();
                translation.language = language;
                this.translations.push(translation);
            }
            for (const category of this.categories) {
                if (!category.translations.some(t => t.language === language)) {
                    const translation = new OcaCategoryTranslation();
                    translation.language = language;
                    category.translations.push(translation);
                }
                for (const attribute of category.attributes) {
                    if (!attribute.translations.some(t => t.language === language)) {
                        const translation = new OcaAttributeTranslation();
                        translation.language = language;
                        attribute.translations.push(translation);
                    }
                }
            }
        }
    }

    removeLanguage(language: string): void {
        if (this.languages.some((l) => l === language)) {
            this.languages = this.languages.filter(l => l !== language); 
        }
        for (const category of this.categories) {
            if (category.translations.some(t => t.language === language)) {
                category.translations = category.translations.filter(t => t.language !== language); 
            }
            for (const attribute of category.attributes) {
                if (!attribute.translations.some(t => t.language === language)) {
                    const translation = new OcaAttributeTranslation();
                    translation.language = language;
                    attribute.translations = attribute.translations.filter(t => t.language !== language); 
                }
            }
        }
    }
}