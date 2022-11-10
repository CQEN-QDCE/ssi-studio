import { Component, OnInit, OnDestroy } from "@angular/core";
import { ErrorDialogService } from "../services/error-dialog.service";
import { ErrorNotification } from "../models/error-notification";
import * as _ from 'lodash';

@Component({
    selector: "error-dialog",
    templateUrl: "./error-dialog.component.html",
    styleUrls: ["./error-dialog.component.css"]
})

export class ErrorDialogComponent implements OnInit, OnDestroy {

    private subcriptions: any[];

    outputNotification: boolean;

    display: boolean;

    title: string | null;

    message: string | null;

    errorType: string | null;

    constructor(private errorDialogService: ErrorDialogService) {
        this.subcriptions = []; 
        this.outputNotification = false;
        this.display = false;
        this.title = null;
        this.message = null;
        this.errorType = null;
    }

    ngOnInit(): void {
        this.subcriptions.push(this.errorDialogService.displayErrorCalled.subscribe(error => {
            this.displayError(error);
        }));
    }

    public close(): void {
        this.outputNotification = false;
        this.display = false;
        this.message = null;
    }

    private displayError(error: ErrorNotification): void {
        this.outputNotification = true;
        this.display = true;
        this.message = error.message;
        setTimeout(function(){ window.dispatchEvent(new Event('resize')); }, 200);
    }

    ngOnDestroy() {
        _.each(this.subcriptions, (s) => {
            s.unsubscribe();
        });
    }
}