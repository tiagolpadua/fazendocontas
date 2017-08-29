import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Ano, TipoQuestao } from '../fc-models/fc-data.models';
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
    this.fcDataService.getAnos()
      .then(anos => {
        this.anos = anos;
      })
      .catch(err => {
        window.alert(err);
      });
  }
}
