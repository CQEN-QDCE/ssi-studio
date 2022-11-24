import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
import { SseService } from "./sse.service";

@Injectable({
    providedIn: 'root'
})
export class MyService {
    constructor(private _zone: NgZone, private _sseService: SseService) {

    }
    
    getServerSentEvent(url: string) {
        return Observable.create((observer: { next: (arg0: MessageEvent<any>) => void; error: (arg0: Event) => void; }) => {
            const eventSource = this._sseService.getEventSource(url);

            eventSource.onmessage = event => {
                this._zone.run(() => {
                    observer.next(event);
                })
            }

            eventSource.onerror = error => {
                this._zone.run(() => {
                    observer.error(error);
                })
            }
        })
    }
}