import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ano, TipoQuestao } from '../fc-models/fc-data-models';

@Component({
  selector: 'fc-selecao-ano',
  templateUrl: './fc-selecao-ano.component.html',
  styleUrls: ['./fc-selecao-ano.component.css']
})
export class FcSelecaoAnoComponent implements OnInit {
  @Input() ano: Ano;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  selecionarTipo(tipoQuestao: TipoQuestao) {
    console.log('Tipo de questão selecionada: ' + JSON.stringify(tipoQuestao));
    this.router.navigate(['/exercicio', tipoQuestao._id]);
  }

}
