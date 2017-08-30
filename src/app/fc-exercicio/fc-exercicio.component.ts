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
  pontos: number;
  qtdExercicios = 10;
  alerta: boolean;
  funcaoGeradora: string;

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

        if (!this.fcExerciciosService[this.tipoQuestao.funcao]) {
          const msg = `Função geradora não localizada para o tipo de questão: ${idTipoQuestao} - ${this.tipoQuestao.funcao}.}`;
          window.alert(msg);
          throw msg;
        }

        this.gerarExercicios();
      });
  }

  selecionarResposta(index: number) {
    this.alerta = false;
    if (index === this.exercicios[this.indiceExercicioAtual].indiceRespostaCorreta) {
      this.pontos += 1;
      this.indiceExercicioAtual += 1;
    } else {
      this.alerta = true;
      setTimeout(() => {
        this.alerta = false;
      }, 5000);
      this.gerarExercicios();
    }
  }

  private gerarExercicios() {
    this.pontos = 0;
    this.indiceExercicioAtual = 0;
    this.exercicios = this.fcExerciciosService[this.tipoQuestao.funcao](this.qtdExercicios);
  }

  getPercentualCompleto() {
    return (this.indiceExercicioAtual / this.qtdExercicios) * 100;
  }
}
