import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'oca-menubar',
  templateUrl: './oca-menubar.component.html',
  styleUrls: ['./oca-menubar.component.css']
})
export class OcaMenubarComponent implements OnInit, OnDestroy {

    items: MenuItem[] = [];

    @Output() onAddCategory: EventEmitter<string> = new EventEmitter<string>();

    @Output() onPreview: EventEmitter<string[]> = new EventEmitter<string[]>();

    @Output() onExport: EventEmitter<string[]> = new EventEmitter<string[]>();

    @Output() onPublish: EventEmitter<string[]> = new EventEmitter<string[]>();

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor() { 
        this.items = [{
            label: 'Add Category',
            icon: 'fa fa-plus',
            command: (event) => {
                this.addCategory();
            }
        },
        {
            label: 'Preview',
            icon: 'fa fa-image',
            command: (event) => {
                this.preview();
            }
        },
        {
            label: 'Export',
            icon: 'fa fa-file',
            command: (event) => {
                this.export();
            }
        }/*,
        {
            label: 'Publish',
            icon: 'fa fa-globe',
            command: (event) => {
                this.publish();
            }
        }*/]
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): any {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    addCategory(): void {
        this.onAddCategory.emit('Category');
    } 

    preview(): void {
        this.onPreview.emit();
        
    } 

    export(): void {
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(new Blob(["CONTENT"], {type: "text/plain"}));
        a.download = "demo.txt";
        a.click();
        this.onExport.emit();
        
    } 

    async publish(): Promise<void> {
        this.onPublish.emit();        
    } 
}
