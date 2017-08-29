import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoQuestao } from '../fc-models/fc-data.models';
import { FcDataService } from '../fc-services/fc-data.services';
import { FCExerciciosService } from '../fc-services/fc-exercicios.services';

import { Exercicio } from '../fc-models/fc-data.models';

@Component({
  selector: 'app-fc-exercicio',
  templateUrl: './fc-exercicio.component.html',
  styleUrls: ['./fc-exercicio.component.css']
})
export class FcExercicioComponent implements OnInit {
  tipoQuestao: TipoQuestao;
  exercicios: Exercicio[];
  indiceExercicioAtual: number;
  pontos = 0;
  qtdExercicios = 10;

  constructor(
    private route: ActivatedRoute,
    private fcDataService: FcDataService,
    private fcExerciciosService: FCExerciciosService
  ) { }

  ngOnInit() {
    const idTipoQuestao = this.route.snapshot.params['idTipoQuestao'];
    if (!idTipoQuestao) {
      const msg = 'Tipo de questão não informado...';
      window.alert(msg);
      throw msg;
    }
    this.fcDataService.getTiposQuestoes()
      .then(tqs => {
        this.tipoQuestao = tqs.find(tq => tq._id === idTipoQuestao);
        if (!this.tipoQuestao) {
          const msg = `Tipo de questão não localizado para id informado: ${idTipoQuestao}`;
          window.alert(msg);
          throw msg;
        }
        this.exercicios = this.fcExerciciosService.gerarExerciciosSomaAte10(this.qtdExercicios);
        this.indiceExercicioAtual = 0;
      });
  }

  selecionarResposta(index: number) {
    if (index === this.exercicios[this.indiceExercicioAtual].indiceRespostaCorreta) {
      this.pontos += 1;
    }

    if (this.indiceExercicioAtual < this.qtdExercicios - 1) {
      this.indiceExercicioAtual++;
    }
  }

}
