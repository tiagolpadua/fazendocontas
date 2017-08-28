import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Ano, TipoQuestao } from '../fc-models/fc-data-models';
import { Injectable } from '@angular/core';

@Injectable()
export class FcDataService {
  constructor(private http: Http) { }

  getTiposQuestoes(): Promise<TipoQuestao[]> {
    return this.http.get('/assets/api/tipos-questoes.json')
      .map((res: Response) => res.json())
      .toPromise();
  }

  getAnos(): Promise<Ano[]> {
    return this.http.get('/assets/api/anos.json')
      .map((res: Response) => res.json())
      .toPromise();
  }
}
