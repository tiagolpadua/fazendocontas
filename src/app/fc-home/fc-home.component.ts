import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Ano, TipoQuestao } from '../fc-models/fc-data-models';
import { FcDataService } from '../fc-services/fc-data.services';

@Component({
  selector: 'app-fc-home',
  templateUrl: './fc-home.component.html',
  styleUrls: ['./fc-home.component.css']
})
export class FcHomeComponent implements OnInit {
  anos: Ano[] = [];
  tiposQuestoes: TipoQuestao[] = [];

  constructor(
    private http: Http,
    private fcDataService: FcDataService) {}

  ngOnInit() {
    const p1 = this.fcDataService.getTiposQuestoes()
      .then(tiposQuestoes => {
        this.tiposQuestoes = tiposQuestoes;
        console.log('Completa tipos');
      })
      .catch(err => {
        window.alert(err);
      });

    const p2 = this.fcDataService.getAnos()
      .then(anos => {
        this.anos = anos;
        console.log('Completa anos');
      })
      .catch(err => {
        window.alert(err);
      });

    Observable.forkJoin([p1, p2]).subscribe(t => {
      console.log('ambas completas');
    });
  }
}
