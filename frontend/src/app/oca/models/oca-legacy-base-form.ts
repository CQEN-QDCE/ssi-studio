import { OcaForm } from "./oca-form";

export class OcaLegacyBaseForm {

    uuid: string = '';
    name: string = '';
    description: string = '';
    classification: string = '';
    did: string = '';
    version: string = '';

    constructor() {
    }

    static build(form: OcaForm): OcaLegacyBaseForm {
        const baseForm = new OcaLegacyBaseForm();
        baseForm.uuid = form.uuid;
        baseForm.name = form.name;
        baseForm.description = form.description;
        baseForm.classification = form.classification;
        baseForm.did = '';
        baseForm.version = '1';
        return baseForm;
    }
}