import { EventEmitter, Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorNotification } from "../models/error-notification";
import { ErrorNotificationType } from "../models/error-notification-type";

@Injectable()
export class ErrorDialogService {

    public displayErrorCalled:EventEmitter<ErrorNotification> = new EventEmitter();
    
    displayError(error: Error): void {
        if (error instanceof HttpErrorResponse) {
            let httpError = error as HttpErrorResponse;
            if (httpError.status === 0 && httpError.statusText === 'Unknown Error') {
                this.displayErrorCalled.emit(new ErrorNotification("Server unavailable.", ErrorNotificationType.Error));
            } else if (httpError.status === 500) {
                let message = "Internal server error.\n";
                if (httpError.error.Stack) {
                    for(var propertyName in httpError.error.Stack) {
                        message += "\n";
                        message += propertyName + ": " + httpError.error.Stack[propertyName];
                     }
                }
                this.displayErrorCalled.emit(new ErrorNotification(message, ErrorNotificationType.Error));
            } else if (httpError.status === 409) {
                this.displayErrorCalled.emit(new ErrorNotification(httpError.error.message, ErrorNotificationType.Error));
            } else {
                this.displayErrorCalled.emit(new ErrorNotification(httpError.message, ErrorNotificationType.Error));
            }
        } else {
            this.displayErrorCalled.emit(new ErrorNotification(error.message, ErrorNotificationType.Error));
        }
    }
}