import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { VerificationTemplate } from '../models/verification-template';
import { Routes } from '../routes';

@Injectable()
export class VerificationTemplateService {

  private apiUrl: string = environment.config.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAllByLaboratory(laboratoryId: string): Observable<VerificationTemplate[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${Routes.LABORATORY}/${laboratoryId}/${Routes.VERIFICATION}`).pipe(map((dtos:any[]) => {
        const templates: VerificationTemplate[] = [];
        for (const dto of dtos) {
          templates.push(VerificationTemplate.fromDto(dto));
        }
        return templates.sort((t1,t2) => t1.name.localeCompare(t2.name));
      }));
  }

  get(id: string): Observable<VerificationTemplate> {
    return this.http.get<any>(`${this.apiUrl}/${Routes.VERIFICATION}/${id}`).pipe(map((dto: any) => {
      return VerificationTemplate.fromDto(dto);
    }));
  }

  create(template: VerificationTemplate): Observable<VerificationTemplate> {
    let subject = new Subject<VerificationTemplate>();
    this.http.post<any>(`${this.apiUrl}/${Routes.VERIFICATION}`, template).subscribe(
      { 
        next: (dto) => {
            subject.next(VerificationTemplate.fromDto(dto));
        },
        error: (error) => {
            subject.error(error);
        }
      }
    );
    return subject.asObservable();
  }

  update(template: VerificationTemplate): Observable<VerificationTemplate> {
    let subject = new Subject<VerificationTemplate>();
    this.http.put<any>(`${this.apiUrl}/${Routes.VERIFICATION}`, template).subscribe(
      { 
        next: (dto) => {
            subject.next(VerificationTemplate.fromDto(dto));
        },
        error: (error) => {
            subject.error(error);
        }
      }
    );
    return subject.asObservable();
  }

  delete(template: VerificationTemplate): Observable<void> {
    let subject = new Subject<void>();
    this.http.delete(`${this.apiUrl}/${Routes.VERIFICATION}/${template.id}`).subscribe(
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