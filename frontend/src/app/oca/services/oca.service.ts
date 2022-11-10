import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { OcaLegacyBaseForm } from '../models/oca-legacy-base-form';
import { OcaLegacyForm } from '../models/oca-legacy-form';
import * as JSZip from 'jszip'

@Injectable()
export class OcaService {

  private apiUrl: string = environment.config.apiUrl;

  constructor(private http: HttpClient) {
  }

  createSchema(baseForm: OcaLegacyBaseForm, form: OcaLegacyForm): Observable<any> {
    let subject = new Subject<any>();
    this.http.post<any>(`${this.apiUrl}/create-schema`, { baseForm: baseForm, form: form }).subscribe(
      async res => {
        const blob = await this.exportToZip(res);
        const fd = new FormData();
        const file = new File([blob], "file.zip", { type: blob.type });
        fd.append('file', file);
        /*
        this.http.post<any>(`https://repository.oca.argo.colossi.network/api/v4/namespaces/cqen/schemas`, fd).subscribe(
          async res => {
            let bla = 1;
          },
          err => {
            subject.error(err);
          }
        );
        */
        subject.next(res);
      },
      err => {
        subject.error(err);
      }
    );
    return subject.asObservable();
  }

  async exportToZip(schema: any): Promise<any> {

    const zip = new JSZip();
    
    const schemaName = schema.schemaBase.name;

    zip.file(
      `${schemaName}.json`,
      JSON.stringify(schema.schemaBase, null, 2)
    )
    const { schemaBase, ...schemaOverlays } = schema

    for (let overlays of Object.values(schemaOverlays)) {
        for (let [key, value] of Object.entries(overlays as object)) {
            zip.file(
              `${schemaName}/${key}.json`,
              JSON.stringify(value, null, 2)
            )
        }
        
    }
    
    return await zip.generateAsync({type:"blob"}).then((content) => {
      return content
    });
  }

}