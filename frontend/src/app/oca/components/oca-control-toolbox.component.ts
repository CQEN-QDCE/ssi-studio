import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { OcaAttributeType } from '../models/oca-attribute-type.enum';
import { OcaAttribute } from '../models/oca-attribute';

@Component({
  selector: 'oca-control-toolbox',
  templateUrl: './oca-control-toolbox.component.html',
  styleUrls: ['./oca-control-toolbox.component.css']
})
export class OcaControlToolboxComponent implements OnInit, OnDestroy {

    availableAttributes: OcaAttribute[] = [];

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor() { 
    }

    ngOnInit(): void {
        this.availableAttributes.push(this.buildOcaControl(OcaAttributeType.TextInput, 'fa fa-edit'));
        this.availableAttributes.push(this.buildOcaControl(OcaAttributeType.NumberInput, 'fa fa-calculator'));
        this.availableAttributes.push(this.buildOcaControl(OcaAttributeType.DatePicker, 'fa fa-calendar'));
        this.availableAttributes.push(this.buildOcaControl(OcaAttributeType.TimePicker, 'fa fa-clock-o')); 
        this.availableAttributes.push(this.buildOcaControl(OcaAttributeType.SelectOption, 'fa fa-database'));
        this.availableAttributes.push(this.buildOcaControl(OcaAttributeType.Checkbox, 'fa fa-check'));
    }

    dragStart(event: any, ocaControl: OcaAttribute) {
        event.dataTransfer.setData('ocaControl', JSON.stringify(ocaControl));
    }

    ngOnDestroy(): any {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    private buildOcaControl(attributeType: OcaAttributeType, icon: string): OcaAttribute {
        const ocaControl = new OcaAttribute();
        ocaControl.type = attributeType;
        ocaControl.icon = icon;
        ocaControl.controlLabel = attributeType;
        ocaControl.translations[0].controlLabel = attributeType;
        return ocaControl;
    }

}
