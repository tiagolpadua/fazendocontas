import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ano, TipoQuestao } from '../fc-models/fc-data.models';
import { FcDataService } from '../fc-services/fc-data.services';

@Component({
  selector: 'fc-selecao-ano',
  templateUrl: './fc-selecao-ano.component.html',
  styleUrls: ['./fc-selecao-ano.component.css']
})
export class FcSelecaoAnoComponent implements OnInit {
  @Input() ano: Ano;
  tiposQuestoes: TipoQuestao[];

  constructor(private router: Router, private fcDataService: FcDataService) { }

  ngOnInit() {
    this.fcDataService.getTiposQuestoes()
    .then(tqs => {
      this.tiposQuestoes = tqs.filter(tq => this.ano.idsTiposQuestoes.indexOf(tq._id) !== -1);
    });
  }

  selecionarTipoQuestao(tipoQuestao: TipoQuestao) {
    this.router.navigate(['/exercicio', tipoQuestao._id]);
  }

}
