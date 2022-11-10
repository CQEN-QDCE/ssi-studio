import { ChangeDetectorRef, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { OcaAttribute } from '../models/oca-attribute';
import { OcaEncoding } from '../models/oca-encoding.enum';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OcaOption } from '../models/oca-option';

export const ocaAttributeEditorValueAccessor: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OcaAttributeEditorComponent),
    multi: true
};
@Component({
  selector: 'oca-attribute-editor',
  templateUrl: './oca-attribute-editor.component.html',
  styleUrls: ['./oca-attribute-editor.component.css'],
  providers: [ocaAttributeEditorValueAccessor]
})
export class OcaAttributeEditorComponent implements OnInit, OnDestroy {

    attribute: OcaAttribute = new OcaAttribute();

    encodings: OcaEncoding[] = [];

    dateFormats: string[] = [];

    timeFormats: string[] = [];

    onModelChange: Function = () => { };

    private ngUnsubscribe: Subject<void> = new Subject<void>();
   
    constructor(private readonly cd: ChangeDetectorRef,) { 
        this.encodings.push(OcaEncoding.utf8);
        this.encodings.push(OcaEncoding.iso88591);
        this.encodings.push(OcaEncoding.windows1251);
        this.dateFormats.push('DD/MM/YYYY');
        this.dateFormats.push('DD-MM-YYYY');
        this.dateFormats.push('MM/DD/YYYY');
        this.dateFormats.push('MM-DD-YYYY');
        this.dateFormats.push('YYYY/MM/DD');
        this.dateFormats.push('YYYY-MM-DD');
        this.timeFormats.push('H:m');
        this.timeFormats.push('HH:mm');
        this.timeFormats.push('h:m p');
        this.timeFormats.push('hh:mm p');
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): any {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    onTouched = () => {
    };

    writeValue(attribute: OcaAttribute): void {
        this.attribute = attribute || new OcaAttribute(); 
        this.cd.markForCheck();
    }

    registerOnChange(fn: (checked: boolean) => void): void {
        this.onModelChange = fn;    
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    selectionChanged(): void {
        this.onModelChange(this.attribute);
    }

    addOption(): void {
    this.attribute.options.push(new OcaOption());
    this.attribute.options = [...this.attribute.options];
    }

    deleteOption(index: number): void {
        this.attribute.options.splice(index, 1);
        this.attribute.options = [...this.attribute.options];
    }
}