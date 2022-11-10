import { identity } from "lodash";
import { OcaAttribute } from "./oca-attribute";
import { OcaForm } from "./oca-form";

export class OcaLegacyForm {

    uuid: string = '';
    label: string = '';
    type: string = '';
    sections: OcaLegacyForm.Section[] = [];
    translations: OcaLegacyForm.Translation[] = [];

    constructor() {
    }

    static build(form: OcaForm): OcaLegacyForm {
        const attributeMap = new Map();
        const legacyForm = new OcaLegacyForm();
        legacyForm.uuid = form.uuid;
        legacyForm.label = form.name;
        let i = 0;
        for (let i = 0; i < form.categories.length; i++) {
            const category = form.categories[i];
            const section = new OcaLegacyForm.Section();
            section.name = 'section_' + (new Date().getTime() + Math.floor((Math.random() * 1000000) + 1));
            section.label = category.name;
            section.labelPlaceholder = 'Category name';
            section.order = i;
            section.clientKey = section.name;
            section.labelPosition = 'left';
            section.isDynamic = false;
            section.minInstance = 1;
            section.maxInstance = 0;
            section.instances = [];

            section.row.order = i;
            for (let j = 0; j < category.attributes.length; j++) {
                const attribute = category.attributes[j];
                const control = new OcaLegacyForm.Control();
                control.type = this.convertControlType(attribute);
                control.name = 'control_' + control.type + '_' + (new Date().getTime() + Math.floor((Math.random() * 1000000) + 1));
                control.fieldName = control.name;
                control.label = attribute.controlLabel;
                control.labelPlaceholder = control.label;
                control.order = j;
                control.defaultValue = attribute.defaultValue;
                control.defaultValuePlaceholder = control.defaultValue;
                control.className = 'col-md-12';
                control.readOnly = attribute.readOnly;
                control.information = attribute.information;
                control.informationPlaceholder = control.information;
                control.isPII = attribute.pii;
                control.attrName = attribute.name;
                control.attrType = this.convertAttributeType(attribute);
                control.encoding = attribute.encoding;
                control.required = attribute.required;
                control.errors = [];
                control.isInteger = false;
                control.decimalPlace = attribute.decimalPlaces;
                control.dateFormat = attribute.dateFormat;
                control.timeFormat = attribute.timeFormat;
                control.isMultiple = attribute.multiSelect;
                control.isAjax = false;
                control.dataOptions = [];
                let id = 1;
                for (const option of attribute.options) {
                    control.dataOptions.push({id: id, text: option.value, placeholder: option.value});
                    id++;
                }
                control.ajaxDataUrl = '';
                control.isChecked = attribute.autoCheck;
                section.row.controls.push(control);
                attributeMap.set(j, control);
            }
            legacyForm.sections.push(section);
        }

        for (const language of form.languages) {
            const translation = new OcaLegacyForm.Translation();
            translation.language = language;
            for (let i = 0; i < form.categories.length; i++) {
                const category = form.categories[i];
                let index = category.translations.findIndex((t) => t.language === language);
                if (index !== -1) { 
                    const dataSection = new OcaLegacyForm.TranslationDataSection();
                    dataSection.id = i;
                    dataSection.label = category.translations[index].name;
                    translation.data.sections.push(dataSection);
                }
                for (let j = 0; j < category.attributes.length; j++) {
                    const attribute = category.attributes[j];
                    let index = attribute.translations.findIndex((t) => t.language === language);
                    if (index !== -1) { 
                        const dataControl = new OcaLegacyForm.TranslationDataControl();
                        dataControl.fieldName = attributeMap.get(j).name as string;
                        dataControl.label = attribute.translations[index].controlLabel;
                        dataControl.defaultValue = attribute.translations[index].defaultValue;
                        dataControl.information = attribute.translations[index].information;
                        dataControl.dataOptions = [];
                        let id = 1;
                        for (const option of attribute.translations[index].options) {
                            dataControl.dataOptions.push({id: id, text: option.value});
                            id++;
                        }
//                        dataControl.label = category.translations[index].name;
                        translation.data.controls.push(dataControl);
                    }
                }
            }
            legacyForm.translations.push(translation);
        }

        return legacyForm;
    }

    private static convertAttributeType(attribute: OcaAttribute): string {
        if (attribute.type === 'Text Input') return 'Text';
        if (attribute.type === 'Number Input') return 'Number';
        if (attribute.type === 'Date Picker') return 'Date';
        if (attribute.type === 'Time Picker') return 'Date';
        if (attribute.type === 'Select Option') return 'Array[Text]';
        if (attribute.type === 'Checkbox') return 'Boolean';
        return '';
    }

    private static convertControlType(attribute: OcaAttribute): string {
        if (attribute.type === 'Text Input') return 'text';
        if (attribute.type === 'Number Input') return 'number';
        if (attribute.type === 'Date Picker') return 'datepicker';
        if (attribute.type === 'Time Picker') return 'timepicker';
        if (attribute.type === 'Select Option') return 'select';
        if (attribute.type === 'Checkbox') return 'checkbox';
        return '';
    }
}

export module OcaLegacyForm {

    export class Section {
        
        name: string = '';
        label: string = '';
        labelPlaceholder: string = '';
        clientKey: string = '';
        order: number = 0;
        row: Row = new OcaLegacyForm.Row();
        labelPosition: string = 'left';
        isDynamic: boolean = false;
        minInstance: number = 0;
        maxInstance: number = 0;
        instances: any[] = [];

        constructor() {
        }
    }
    
    export class Row {
        name: string = '';
        label: string = '';
        order: number = 0;
        controls: OcaLegacyForm.Control[] = []
        constructor() {
        }
    }
    
    export class Control {
        uuid: string = '';
        type: string = '';
        name: string = '';
        fieldName: string = '';
        label: string = '';
        labelPlaceholder: string = '';
        order: number = 0;
        defaultValue: string = '';
        defaultValuePlaceholder: string = '';
        value: string = '';
        className: string = '';
        readOnly: boolean = false;
        information: string = '';
        informationPlaceholder: string = '';
        isPII: boolean = false;
        attrName: string = '';
        attrType: string = '';
        encoding: string = '';
        required: boolean = false;
        errors: string[] = [];
        isInteger: boolean = false;
        decimalPlace: number = 0;
        dateFormat: string | null = null;
        timeFormat: string | null = null;
        isMultiple: boolean = false;
        isAjax: boolean = false;
        dataOptions: DataOption[] = [];
        ajaxDataUrl: string = '';
        isChecked: boolean = false;

        constructor() {
        }
    }

    export class DataOption {
        id: number = 0;
        text: string = '';
        placeholder: string = '';
        constructor() {
        }
    }

    export class Translation {
        language: string = '';
        data: OcaLegacyForm.TranslationData = new OcaLegacyForm.TranslationData();
        constructor() {
        }
    }

    export class TranslationData {
        language: string = '';
        sections: OcaLegacyForm.TranslationDataSection[] = [];
        controls: OcaLegacyForm.TranslationDataControl[] = [];
        constructor() {
        }
    }

    export class TranslationDataSection {
        id: number = 0;
        label: string = '';
        constructor() {
        }
    }

    export class TranslationDataControl {
        fieldName: string = '';
        label: string = '';
        defaultValue: string = '';
        information: string = '';
        dataOptions: TranslationDataOption[] = [];
        constructor() {
        }
    }

    export class TranslationDataOption {
        id: number = 0;
        text: string = '';
        constructor() {
        }
    }
}