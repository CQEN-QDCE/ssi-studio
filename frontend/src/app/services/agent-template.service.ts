import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { AgentTemplate } from '../models/agent-template';

@Injectable()
export class AgentTemplateService {

  private apiUrl: string = environment.config.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAllByOrganization(organizationId: string): Observable<AgentTemplate[]> {
    return this.http.get<any[]>(this.apiUrl + '/organizations/' + organizationId + '/agents').pipe(map((dtos:any[]) => {
        const agentTemplates: AgentTemplate[] = [];
        dtos.forEach( (dto) => {
          agentTemplates.push(AgentTemplate.fromDto(dto));
        });
        return agentTemplates.sort((a,b) => a.name.localeCompare(b.name));
      }));
  }

  get(id: string): Observable<AgentTemplate> {
    return this.http.get<any>(this.apiUrl + '/agents/' + id).pipe(map((dto: any) => {
      return AgentTemplate.fromDto(dto);
    }));
  }

  create(agentTemplate: AgentTemplate): Observable<AgentTemplate> {
    const subject = new Subject<AgentTemplate>();
    this.http.post<any>(`${this.apiUrl}/agents`, agentTemplate).subscribe(
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
    this.http.put<any>(`${this.apiUrl}/agents`, agentTemplate).subscribe(
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
    this.http.delete(this.apiUrl + '/agents/' + agentTemplate.id).subscribe(
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