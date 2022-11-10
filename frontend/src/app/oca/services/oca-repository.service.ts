import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { OcaSchemaQuery } from '../models/oca-schema-query';

@Injectable()
export class OcaRepositoryService {

  private hostUrl: string = environment.config.ocaRepositoryUrl;

  constructor(private http: HttpClient) {
  }

  // Fetch OCA Schemas.
  search(query: OcaSchemaQuery = new OcaSchemaQuery()): Observable<any[]> {
    let params: any[] = [];
    if (query) {
      if (query.suggest !== null) params.push('suggest=' + query.suggest);
      if (query.namespace !== null) params.push('namespace=' + query.namespace);
      if (query.q !== null) params.push('q=' + query.q);
      if (query.type !== null) params.push('type=' + query.type);
      if (query.limit !== null) params.push('limit=' + query.limit);
    }
    let queryParams = params.length > 0 ? '?' + params.join('&') : '';
    return this.http.get<any>(`${this.hostUrl}/schemas${queryParams}`).pipe(map(dtos => {
      const ocaSchemas: any[] = [];
      for (const dto of dtos) {
        ocaSchemas.push(dto);
      }
      return ocaSchemas;
    }));
  }

  get(sai: string): Observable<any> {
    return this.http.get(`${this.hostUrl}/schemas/${sai}`).pipe(map(dto => {
      return dto;
    }));
  }

  getArchive(sai: string): Observable<Blob> {
    return this.http.get(`${this.hostUrl}/schemas/${sai}/archive`, {responseType: 'blob'});
  }
}