import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ErrorDialogService } from './services/error-dialog.service';
@Injectable()
export class ErrorIntercept implements HttpInterceptor {
    constructor(private injector: Injector) {
    }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                        errorMessage = this.getMessage(errorMessage);
                    }
                    const translateService = this.injector.get(TranslateService);
                    const test = translateService.instant('SchemaAlreadyExistsError');
                    const errorDialogService = this.injector.get(ErrorDialogService);
                    errorDialogService.displayError({
                        message: errorMessage,
                        name: ''
                    });
                    console.log(errorMessage);
                    return throwError(() => errorMessage);
                })
            )
    }

    private getMessage(message: string): string {
        const translateService = this.injector.get(TranslateService);
        if (message.indexOf('400 Schema') >= 0 && message.indexOf('already exists') >= 0) {
            const schema = message.substring(message.indexOf('400 Schema') + 11, message.indexOf('already exists'));        
            return translateService.instant('SchemaAlreadyExistsError', {schema: schema});
        } else if (message.indexOf('500 Internal Server Error') >= 0) {
            return translateService.instant('InternalServerError');
        } else {
            return message;
        }
    }
}