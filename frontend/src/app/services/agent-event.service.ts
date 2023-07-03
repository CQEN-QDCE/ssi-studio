import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { Routes } from '../routes';
import { AgentEvent } from '../models/agent-event';
import { AgentEventResult } from '../models/agent-event-result';

@Injectable()
export class AgentEventService {

  private apiUrl: string = environment.config.apiUrl;

  constructor(private http: HttpClient) {
  }

  getByAgentSlug(agentSlug: string, skip: number | null = 0, take: number | null = 1000000): Observable<AgentEventResult> {
    return this.http.get<any[]>(`${this.apiUrl}/${Routes.AGENT_EVENT}?slug=${agentSlug}&skip=${skip}&take=${take}`).pipe(map((dto:any) => {
        const agentEventResult = new AgentEventResult();
        agentEventResult.total = dto.total;
        agentEventResult.skip = dto.skip;
        agentEventResult.take = dto.take;
        const agentEvents: AgentEvent[] = [];
        dto.agentEvents.forEach( (dto2: any) => {
          agentEvents.push(AgentEvent.fromDto(dto2));
        });
        agentEventResult.agentEvents = agentEvents;
        return agentEventResult;
      }));
  }

  get(id: string): Observable<AgentEvent> {
    return this.http.get<any>(`${this.apiUrl}/${Routes.AGENT_EVENT}/${id}`).pipe(map((dto: any) => {
      return AgentEvent.fromDto(dto);
    }));
  }

  create(agentEvent: AgentEvent): Observable<AgentEvent> {
    const subject = new Subject<AgentEvent>();
    this.http.post<any>(`${this.apiUrl}/${Routes.AGENT_EVENT}`, agentEvent).subscribe(
        { 
            next: (dto) => {
                subject.next(AgentEvent.fromDto(dto));
            },
            error: (error) => {
                subject.error(error);
            }
        }
    );
    return subject.asObservable();
  }

  update(agentEvent: AgentEvent): Observable<AgentEvent> {
    const subject = new Subject<AgentEvent>();
    this.http.put<any>(`${this.apiUrl}/${Routes.AGENT_EVENT}`, agentEvent).subscribe(
        { 
            next: (dto) => {
                subject.next(AgentEvent.fromDto(dto));
            },
            error: (error) => {
                subject.error(error);
            }
        }
    );
    return subject.asObservable();
  }

  delete(agentEvent: AgentEvent): Observable<void> {
    const subject = new Subject<void>();
    this.http.delete(`${this.apiUrl}/${Routes.AGENT_EVENT}/${agentEvent.id}`).subscribe(
        { 
            next: () => {
                subject.next();
            },
            error: (error) => {
                subject.error(error);
            }
        }
    );
    return subject.asObservable();
  }
}