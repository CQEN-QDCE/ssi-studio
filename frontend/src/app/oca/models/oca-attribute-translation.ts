import { OcaAttributeType } from "./oca-attribute-type.enum";
import { OcaOption } from "./oca-option";

export class OcaAttributeTranslation {

    language: string = 'en_US';
    controlLabel: string = OcaAttributeType.TextInput;
    defaultValue: string = '';
    information: string = '';
    options: OcaOption[] = [];

    constructor() {
    }
}