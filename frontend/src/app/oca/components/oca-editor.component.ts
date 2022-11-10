import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { OcaForm } from '../models/oca-form';
import { OcaFormBuilderComponent } from './oca-form-builder.component';
import { OcaLanguageSelectorComponent } from './oca-language-selector.component';

@Component({
  selector: 'oca-editor',
  templateUrl: './oca-editor.component.html',
  styleUrls: ['./oca-editor.component.css']
})
export class OcaEditorComponent implements OnInit, OnDestroy, AfterViewInit {
    
    ocaForm: OcaForm = new OcaForm();

    currentLanguage: string = 'en_US';

    @ViewChild('ocaLanguageSelector') ocaLanguageSelector: OcaLanguageSelectorComponent | null = null;

    @ViewChild('ocaFormBuilder') ocaFormBuilder: OcaFormBuilderComponent | null = null;

    @Input('form')
    set setOcaForm(ocaForm: OcaForm | null) {
        if (ocaForm) {
            this.ocaForm = ocaForm;
            this.initSelectedLanguages();
            this.ocaForm.initLanguage(this.currentLanguage);
        }
    }
    
    private ngUnsubscribe: Subject<void> = new Subject<void>();
   
    constructor() { 
    }

    ngAfterViewInit(): void {
        this.initSelectedLanguages();
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): any {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    changeCurrentLanguage(language: string): void {
      this.currentLanguage = language;
    }
    
    changeSupportedLanguages(languages: string[]): void {
      this.ocaFormBuilder?.setSupportedLanguages(languages);
      const index = languages.findIndex((l) => l === this.currentLanguage);
      if (index === -1) {
        this.currentLanguage = languages[0];
      }
    }
    
    addCategory(name: string): void {
      this.ocaFormBuilder?.addCategory(name);
    }

    private initSelectedLanguages(): void {
        if (this.ocaLanguageSelector && this.ocaForm) {
            this.ocaLanguageSelector.selectedLanguages = [];
            for (const translation of this.ocaForm.translations) {
                this.ocaLanguageSelector.selectedLanguages.push(translation.language);
            }
            this.currentLanguage = this.ocaLanguageSelector.selectedLanguages[0];
        }
    }
}