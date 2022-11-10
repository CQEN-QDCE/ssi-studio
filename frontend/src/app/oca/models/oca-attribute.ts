import { OcaAttributeType } from "./oca-attribute-type.enum";
import { OcaEncoding } from "./oca-encoding.enum";
import { OcaAttributeTranslation } from "./oca-attribute-translation";
import { OcaOption } from "./oca-option";

export class OcaAttribute {

    id: string = '';
    name: string = '';
    icon: string = '';
    required: boolean = false;
    readOnly: boolean = false;
    pii: boolean = false;
    type: OcaAttributeType = OcaAttributeType.TextInput;
    encoding: OcaEncoding = OcaEncoding.utf8;
    controlLabel: string = OcaAttributeType.TextInput;
    defaultValue: string = '';
    information: string = '';
    dateFormat: string | null = null;
    timeFormat: string | null = null;
    decimalPlaces: number = 0;
    options: OcaOption[] = [];
    autoCheck: boolean = false;
    multiSelect: boolean = false;
    translations: OcaAttributeTranslation[] = [];

    constructor() {
        this.translations.push(new OcaAttributeTranslation());
        this.translations[0].controlLabel = OcaAttributeType.TextInput;
    }

    static from(value: any): OcaAttribute {

        const ocaAttribute = new OcaAttribute();

        ocaAttribute.id = value.id;
        ocaAttribute.name = value.name;
        ocaAttribute.icon = value.icon;
        ocaAttribute.required = value.required;
        ocaAttribute.pii = value.pii;
        ocaAttribute.type = value.type;
        ocaAttribute.encoding = value.encoding;
        ocaAttribute.controlLabel = value.controlLabel;
        ocaAttribute.defaultValue = value.defaultValue;
        ocaAttribute.information = value.information;
        ocaAttribute.translations = [];

        for (const translation of value.translations) {
            const anotherTranslation =  new OcaAttributeTranslation();
            anotherTranslation.controlLabel = translation.controlLabel;
            anotherTranslation.language = translation.language;
            ocaAttribute.translations.push(anotherTranslation);
        }

        return ocaAttribute;
    }

    initLanguage(language: string): void {
        const index = this.translations.findIndex((t) => t.language === language);
        if (index >= 0) {
            this.controlLabel = this.translations[index].controlLabel;
            this.defaultValue = this.translations[index].defaultValue;
            this.information = this.translations[index].information;
            this.options = this.translations[index].options;
        }
    }

    saveLanguage(language: string): void {
        const index = this.translations.findIndex((t) => t.language === language);
        if (index >= 0) {
            this.translations[index].controlLabel = this.controlLabel;
            this.translations[index].defaultValue = this.defaultValue;
            this.translations[index].information = this.information;
            this.translations[index].options = this.options;
        }
    }

    translate(currentLanguage: string, newLanguage: string): void {
        this.saveLanguage(currentLanguage);
        this.initLanguage(newLanguage);
    }

    addTranslation(language: string): void {
        const index = this.translations.findIndex((t) => t.language === language);
        if (index === -1) { 
            const translation = new OcaAttributeTranslation();
            translation.language = language;
            this.translations.push(translation);
        }
    }

    removeTranslation(language: string): void {
        
    }
}
