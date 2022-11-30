import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { Laboratory } from '../models/laboratory';
import { plainToInstance } from 'class-transformer';
import { Routes } from '../routes';

@Injectable()
export class LaboratoryService {

  private apiUrl: string = environment.config.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Laboratory[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${Routes.LABORATORY}`).pipe(map(pojo => plainToInstance(Laboratory, pojo)));
  }

  get(id: string): Observable<Laboratory> {
    return this.http.get<any>(`${this.apiUrl}/${Routes.LABORATORY}/${id}`).pipe(map((pojo: any) => {
      return plainToInstance(Laboratory, pojo);
    }));
  }

  create(laboratory: Laboratory): Observable<Laboratory> {
    const subject = new Subject<Laboratory>();
    this.http.post<any>(`${this.apiUrl}/${Routes.LABORATORY}`, laboratory).subscribe(
      { 
        next: (pojo) => {
          subject.next(plainToInstance(Laboratory, pojo));
        },
        error: (error) => {
          subject.error(error);
        }
      }
    );
    return subject.asObservable();
  }

  update(laboratory: Laboratory): Observable<Laboratory> {
    const subject = new Subject<Laboratory>();
    this.http.put<any>(`${this.apiUrl}/${Routes.LABORATORY}`, laboratory).subscribe(
      { 
        next: (pojo) => {
          subject.next(plainToInstance(Laboratory, pojo));
        },
        error: (error) => {
          subject.error(error);
        }
      }
    );
    return subject.asObservable();
  }

  delete(laboratory: Laboratory): Observable<void> {
    const subject = new Subject<void>();
    this.http.delete(`${this.apiUrl}/${Routes.LABORATORY}/${laboratory.id}`).subscribe(
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