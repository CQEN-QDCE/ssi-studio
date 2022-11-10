import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { Organization } from '../models/organization';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OrganizationService {

  private apiUrl: string = environment.config.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Organization[]> {
    return this.http.get<any[]>(this.apiUrl + '/organizations').pipe(map(pojo => plainToInstance(Organization, pojo)));
  }

  get(id: string): Observable<Organization> {
    return this.http.get<any>(this.apiUrl + '/organizations/' + id).pipe(map((pojo: any) => {
      return plainToInstance(Organization, pojo);
    }));
  }

  create(organization: Organization): Observable<Organization> {
    const subject = new Subject<Organization>();
    this.http.post<any>(`${this.apiUrl}/organizations`, organization).subscribe(
      { 
        next: (pojo) => {
          subject.next(plainToInstance(Organization, pojo));
        },
        error: (error) => {
          subject.error(error);
        }
      }
    );
    return subject.asObservable();
  }

  update(organization: Organization): Observable<Organization> {
    const subject = new Subject<Organization>();
    this.http.put<any>(`${this.apiUrl}/organizations`, organization).subscribe(
      { 
        next: (pojo) => {
          subject.next(plainToInstance(Organization, pojo));
        },
        error: (error) => {
          subject.error(error);
        }
      }
    );
    return subject.asObservable();
  }

  delete(organization: Organization): Observable<void> {
    const subject = new Subject<void>();
    this.http.delete(this.apiUrl + '/organizations/' + organization.id).subscribe(
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