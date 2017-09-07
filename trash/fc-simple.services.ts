import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Ano, TipoQuestao } from '../fc-models/fc-data.models';
import { Injectable } from '@angular/core';

@Injectable()
export class FcSimpleService {

  constructor(private http: Http) { }

  // getLista(): Promise<string[]> {
  //   return this.http.get('/foo/bar.json')
  //     .map((res: Response) => res.json())
  //     .first()
  //     .toPromise();
  // }

  getListaO(): Observable<string[]> {
    return this.http.get('/foo/bar.json')
      .map((res: Response) => res.json());
  }
}
