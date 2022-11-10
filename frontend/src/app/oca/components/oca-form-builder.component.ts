import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OcaCategory } from '../models/oca-category';
import { OcaAttribute } from '../models/oca-attribute';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { OcaAttributeTranslation } from '../models/oca-attribute-translation';
import { OcaAttributeType } from '../models/oca-attribute-type.enum';
import { OcaForm } from '../models/oca-form';
import { OcaLegacyForm } from '../models/oca-legacy-form';
// @ts-ignore
//import { EventHandlerConstant, eventBus, exportToZip, createSchemaFromForm } from 'odca-form'
import { OcaLegacyBaseForm } from '../models/oca-legacy-base-form';
// @ts-ignore
import * as odcaPkg from 'odca';
import { OcaService } from '../services/oca.service';
import { NgForm } from '@angular/forms';
//const odca = odcaPkg.com.thehumancolossuslab.odca;
//const facade = new odca.Facade();

@Component({
  selector: 'oca-form-builder',
  templateUrl: './oca-form-builder.component.html',
  styleUrls: ['./oca-form-builder.component.css']
})
export class OcaFormBuilderComponent implements OnInit, OnDestroy {

    editAttributeDialogVisible: boolean = false;

    selectedAttribute: OcaAttribute = new OcaAttribute();

    language: string = 'en_US';

    form: OcaForm = new OcaForm();

    @ViewChild('ocaForm') ocaForm: NgForm | null = null;

    private ngUnsubscribe: Subject<void> = new Subject<void>(); 

    @Input('language')
    set setLanguage(value: string) {
        if (this.form.languages.some((l) => l === value)) { 
            this.form.translate(this.language, value);
            this.language = value;
        }
    }

    @Input('form')
    set setForm(value: OcaForm | null) {
        if (value)
        this.form = value;
    }
   
    constructor(private ocaService: OcaService) { 
        this.form.uuid = uuidv4();
        this.form.addLanguage('en_US');
        this.form.addCategory(); 
        this.form.initLanguage('en_US');
    }

    ngOnInit(): void {
    }

    drop(event: any) {
        event.preventDefault();
        const ocaAttribute: OcaAttribute = OcaAttribute.from(JSON.parse(event.dataTransfer.getData('ocaControl')));
        ocaAttribute.id = uuidv4();
        if (ocaAttribute) {
            const categoryIndex = parseInt(event.currentTarget.id);
            const category = this.form.categories[categoryIndex];
            category.attributes = [...category.attributes, ocaAttribute];
        }
        ocaAttribute.translations = [];
        for (const supportedLanguage of this.form.languages) {
            const translation = new OcaAttributeTranslation();
            translation.language = supportedLanguage;
            translation.controlLabel = ocaAttribute.controlLabel;
            ocaAttribute.translations.push(translation);
        }
    }

    edit(categoryIndex: number, attribute: OcaAttribute): void {
        const category = this.form.categories[categoryIndex];
        this.selectedAttribute = _.cloneDeep(attribute);
        this.editAttributeDialogVisible = true; 
    }

    remove(categoryIndex: number, attribute: OcaAttribute): void {
        const category = this.form.categories[categoryIndex];
        const attributeIndex = category.attributes.findIndex((a) => a.id === attribute.id);
        if (attributeIndex !== -1) category.attributes.splice(attributeIndex, 1);
    }

    removeCategory(index: number): void {
        this.form.categories.splice(index,1);
    }

    addCategory(name: string): void {
        this.form.addCategory(name);
    }

    acceptEditAttribute(): void {
        let categoryIndex = this.findCategoryIndex(this.selectedAttribute);
        if (categoryIndex !== -1) {
            let ocaCategory = this.form.categories[categoryIndex];
            let attributeIndex = this.findAttributeIndex(ocaCategory, this.selectedAttribute);
            ocaCategory.attributes[attributeIndex] = this.selectedAttribute;
            ocaCategory.attributes = [...ocaCategory.attributes];
        }
        this.editAttributeDialogVisible = false;
    }

    cancelEditAttribute(): void {
        this.editAttributeDialogVisible = false;
    }

    ngOnDestroy(): any {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    private findCategoryIndex(ocaAttribute: OcaAttribute): number {
        for (let i = 0; this.form.categories.length; i++) {
            if (this.findAttributeIndex(this.form.categories[i], ocaAttribute) !== -1) return i;
        }
        return -1;
    }

    private findAttributeIndex(ocaCategory: OcaCategory, ocaAttribute: OcaAttribute): number {
        for (let i = 0; ocaCategory.attributes.length; i++) {
            if (ocaCategory.attributes[i].id === ocaAttribute.id) return i;
        }
        return -1;
    }

    createLegacyForm(): void {
        this.form.saveLanguage(this.language);
        let legacyForm = OcaLegacyForm.build(this.form);
        let legacyBaseForm = OcaLegacyBaseForm.build(this.form);
        this.ocaService.createSchema(legacyBaseForm, legacyForm).pipe(takeUntil(this.ngUnsubscribe)).subscribe(schema => {
            let bla = 1;    
        });
        let bla = 1;
    }

    allowDrop(event:any): boolean {
        console.log('hi!');
        event.preventDefault();
        return false;
    }

    loadForm(): void {
        this.form = OcaForm.from(JSON.parse(localStorage.getItem('myForm') as string));
        this.form.initLanguage(this.language);
    }

    saveForm(): void { 
        this.form.saveLanguage(this.language);
        const jsonData = JSON.stringify(this.form);
        localStorage.setItem('myForm', jsonData);
    }

    addSupportedLanguage(language: string): void { 
        this.form.addLanguage(language);
    }

    removeSupportedLanguage(language: string): void {
        this.form.removeLanguage(language);
    }

    setSupportedLanguages(languages: string[]): void {
        for (const language of languages) {
            if (!this.form.languages.some(l => l === language)) {
                this.addSupportedLanguage(language);
            }
        }
        for (const language of this.form.languages) {
            if (!this.form.languages.some(l => l === language)) {
                this.removeSupportedLanguage(language);
            }
        }
    }
}
