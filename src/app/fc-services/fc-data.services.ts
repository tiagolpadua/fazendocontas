import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Ano, TipoQuestao } from '../fc-models/fc-data.models';
import { Injectable } from '@angular/core';

@Injectable()
export class FcDataService {
  constructor(private http: Http) { }

  getTiposQuestoes(): Observable<TipoQuestao[]> {
    return this.http.get('/assets/api/tipos-questoes.json')
      .map((res: Response) => res.json())
      .catch(err => {
        throw new Error(err.message);
      });
  }

  getAnos(): Observable<Ano[]> {
    return this.http.get('/assets/api/anos.json')
      .map((res: Response) => res.json())
      .catch(err => {
        throw new Error(err.message);
      });
  }

  getImagens(): Observable<string[]> {
    return this.http.get('/assets/api/images.json')
      .map((res: Response) => res.json())
      .catch(err => {
        throw new Error(err.message);
      });
  }
}
