import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { IssueCredential } from '../models/issue-credential';

@Injectable()
export class IssueCredentialService {

  private apiUrl: string = environment.config.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAllByAgent(agentId: string): Observable<IssueCredential[]> {
    return this.http.get<any[]>(this.apiUrl + '/agents/' + agentId + '/issue-credentials').pipe(map((dtos:any[]) => {
        const agentTemplates: IssueCredential[] = [];
        dtos.forEach( (dto) => {
          agentTemplates.push(IssueCredential.fromDto(dto));
        });
        return agentTemplates.sort((a,b) => a.name.localeCompare(b.name));
      }));
  }

  get(id: string): Observable<IssueCredential> {
    return this.http.get<any>(this.apiUrl + '/issue-credentials/' + id).pipe(map((dto: any) => {
      return IssueCredential.fromDto(dto);
    }));
  }

  save(issueCredential: IssueCredential): Observable<IssueCredential> {
    return issueCredential.id === '' ? this.create(issueCredential) : this.update(issueCredential);
  }

  create(issueCredential: IssueCredential): Observable<IssueCredential> {
    const subject = new Subject<IssueCredential>();
    this.http.post<any>(`${this.apiUrl}/issue-credentials`, issueCredential).subscribe(
        { 
            next: (dto) => {
                subject.next(IssueCredential.fromDto(dto));
            },
            error: (error) => {
                subject.error(error);
            }
        }
    );
    return subject.asObservable();
  }

  update(issueCredential: IssueCredential): Observable<IssueCredential> {
    const subject = new Subject<IssueCredential>();
    this.http.put<any>(`${this.apiUrl}/issue-credentials`, issueCredential).subscribe(
        { 
            next: (dto) => {
                subject.next(IssueCredential.fromDto(dto));
            },
            error: (error) => {
                subject.error(error);
            }
        }
    );
    return subject.asObservable();
  }

  delete(issueCredential: IssueCredential): Observable<void> {
    const subject = new Subject<void>();
    this.http.delete(this.apiUrl + '/issue-credentials/' + issueCredential.id).subscribe(
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