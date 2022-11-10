import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { CredentialTemplate } from '../models/credential-template';

@Injectable()
export class CredentialTemplateService {

  private apiUrl: string = environment.config.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAllByOrganization(organizationId: string): Observable<CredentialTemplate[]> {
    return this.http.get<any[]>(this.apiUrl + '/organizations/' + organizationId + '/credentials').pipe(map((dtos:any[]) => {
        const templates: CredentialTemplate[] = [];
        for (const dto of dtos) {
          templates.push(CredentialTemplate.fromDto(dto));
        }
        return templates.sort((t1,t2) => t1.name.localeCompare(t2.name) );
      }));
  }

  get(id: string): Observable<CredentialTemplate> {
    return this.http.get<any>(this.apiUrl + '/credentials/' + id).pipe(map((dto: any) => {
        return CredentialTemplate.fromDto(dto);
      }));
  }

  create(template: CredentialTemplate): Observable<CredentialTemplate> {
    let subject = new Subject<CredentialTemplate>();
    this.http.post<any>(`${this.apiUrl}/credentials`, template).subscribe(
      { 
        next: (dto) => {
            subject.next(CredentialTemplate.fromDto(dto));
        },
        error: (error) => {
            subject.error(error);
        }
      }
    );
    return subject.asObservable();
  }

  update(template: CredentialTemplate): Observable<CredentialTemplate> {
    let subject = new Subject<CredentialTemplate>();
    this.http.put<any>(`${this.apiUrl}/credentials`, template).subscribe(
      { 
        next: (dto) => {
            subject.next(CredentialTemplate.fromDto(dto));
        },
        error: (error) => {
            subject.error(error);
        }
      }
    );
    return subject.asObservable();
  }

  delete(template: CredentialTemplate): Observable<void> {
    let subject = new Subject<void>();
    this.http.delete(this.apiUrl + '/credentials/' + template.id).subscribe(
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