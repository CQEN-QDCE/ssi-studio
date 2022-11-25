import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { AgentTemplate } from '../models/agent-template';
import { Routes } from '../routes';
import { AgentType } from '../models/agentType.enum';

@Injectable()
export class AgentTemplateService {

  private apiUrl: string = environment.config.apiUrl;

  constructor(private http: HttpClient, private handler: HttpBackend) {
  }

  getAllByLaboratory(laboratoryId: string): Observable<AgentTemplate[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${Routes.LABORATORY}/${laboratoryId}/${Routes.AGENT}`).pipe(map((dtos:any[]) => {
        const agentTemplates: AgentTemplate[] = [];
        dtos.forEach( (dto) => {
          agentTemplates.push(AgentTemplate.fromDto(dto));
        });
        return agentTemplates.sort((a,b) => a.name.localeCompare(b.name));
      }));
  }

  findAgentType(url: string,  apiKey = ''): Observable<AgentType> {
    const subject = new Subject<AgentType>();
    const header = new HttpHeaders({'x-api-key': apiKey});
    new HttpClient(this.handler).get<any>(`${url}/discover-features/query`, {headers: header}).subscribe(
      { 
          next: () => {
              subject.next(AgentType.AcaPy);
          },
          error: (error) => {
              subject.next(AgentType.Unknown);
          }
      }
    );
    return subject.asObservable();
  }

  needApiKey(url: string, apiKey = ''): Observable<boolean> {
    const subject = new Subject<boolean>();
    const header = new HttpHeaders({'x-api-key': apiKey});
    new HttpClient(this.handler).get<any>(`${url}/discover-features/query`, {headers: header}).subscribe(
      { 
          next: () => {
              subject.next(false);
          },
          error: (error) => {
              subject.next(true);
          }
      }
    );
    return subject.asObservable();
  }

  get(id: string): Observable<AgentTemplate> {
    return this.http.get<any>(`${this.apiUrl}/${Routes.AGENT}/${id}`).pipe(map((dto: any) => {
      return AgentTemplate.fromDto(dto);
    }));
  }

  create(agentTemplate: AgentTemplate): Observable<AgentTemplate> {
    const subject = new Subject<AgentTemplate>();
    this.http.post<any>(`${this.apiUrl}/${Routes.AGENT}`, agentTemplate).subscribe(
        { 
            next: (dto) => {
                subject.next(AgentTemplate.fromDto(dto));
            },
            error: (error) => {
                subject.error(error);
            }
        }
    );
    return subject.asObservable();
  }

  update(agentTemplate: AgentTemplate): Observable<AgentTemplate> {
    const subject = new Subject<AgentTemplate>();
    this.http.put<any>(`${this.apiUrl}/${Routes.AGENT}`, agentTemplate).subscribe(
        { 
            next: (dto) => {
                subject.next(AgentTemplate.fromDto(dto));
            },
            error: (error) => {
                subject.error(error);
            }
        }
    );
    return subject.asObservable();
  }

  delete(agentTemplate: AgentTemplate): Observable<void> {
    const subject = new Subject<void>();
    this.http.delete(`${this.apiUrl}/${Routes.AGENT}/${agentTemplate.id}`).subscribe(
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