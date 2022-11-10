import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'oca-language-selector',
  templateUrl: './oca-language-selector.component.html',
  styleUrls: ['./oca-language-selector.component.css']
})
export class OcaLanguageSelectorComponent implements OnInit, OnDestroy {

    languages: string[] = [];

    selectedLanguages: string[] = [];

    currentLanguage: string = 'en_US';

    @Output() currentLanguageChange: EventEmitter<string> = new EventEmitter<string>();

    @Output() supportedLanguagesChange: EventEmitter<string[]> = new EventEmitter<string[]>();

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor() { 
        this.languages.push('en_US');
        this.languages.push('fr_FR');
        this.selectedLanguages.push('en_US');
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): any {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    changeSupportedLanguages(languages: string[]): void {
        this.supportedLanguagesChange.emit(languages);
    }

    changeCurrentLanguage(language: string): void {
        this.currentLanguage = language;
        this.currentLanguageChange.emit(language);
    }
}
