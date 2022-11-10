import { Injectable } from "@angular/core";
import { exhaustMap, first, interval, last, MonoTypeOperatorFunction, Observable, scan, switchMapTo, takeWhile, tap, timeout, timer } from "rxjs";

export interface PollOptions {
    interval: number;
    timeout: number;
  }
  
  const OPTIONS_DEFAULT: PollOptions = {
    interval: 5000,
    timeout: 60000
  };
  
@Injectable()
export class Poller {
    
  startPoll<T>(
    pollFn: () => Observable<T>, // intermediate polled responses
    stopPollPredicate: (value: T) => boolean, // condition to stop polling
    options: PollOptions = OPTIONS_DEFAULT): Observable<T> {
    return interval(options.interval)
      .pipe(
        exhaustMap(() => pollFn()),
        first(value => stopPollPredicate(value)),
        timeout(options.timeout)
      );
  }
  
    poll<T>(
        pollInterval: number,
        isPollingActive: (res: T) => boolean,
        maxAttempts = Infinity,
        emitOnlyLast = false
      ): MonoTypeOperatorFunction<T> {
        return source$ => {
          const poll$ = timer(0, pollInterval).pipe(
            scan(attempts => ++attempts, 0),
            tap(this.attemptsGuardFactory(maxAttempts)),
            switchMapTo(source$),
            takeWhile(isPollingActive, true)
          );
      
          return emitOnlyLast ? poll$.pipe(last()) : poll$;
        };
    }

    private attemptsGuardFactory(maxAttempts: number) {
        return (attemptsCount: number) => {
          if (attemptsCount > maxAttempts) {
            throw new Error("Exceeded maxAttempts");
          }
        };
      }
}