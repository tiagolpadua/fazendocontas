import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoQuestao } from '../fc-models/fc-data.models';
import { FcDataService } from '../fc-services/fc-data.services';
import { FCExerciciosService } from '../fc-services/fc-exercicios.services';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
  qtdExercicios = 10;
  funcaoGeradora: string;

  constructor(
    private route: ActivatedRoute,
    private fcDataService: FcDataService,
    private fcExerciciosService: FCExerciciosService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    const idTipoQuestao = this.route.snapshot.params['idTipoQuestao'];
    if (!idTipoQuestao) {
      const msg = 'Tipo de questão não informado...';
      window.alert(msg);
      throw msg;
    }
    this.fcDataService.getTiposQuestoes()
      .subscribe(tqs => {
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
    if (index === this.exercicios[this.indiceExercicioAtual].indiceRespostaCorreta) {
      this.indiceExercicioAtual += 1;
    } else {
      this.toastr.error('Vamos tentar novamente?', 'Que chato, você errou...', { positionClass: 'toast-top-center' });
      this.gerarExercicios();
    }
  }

  private gerarExercicios() {
    this.indiceExercicioAtual = 0;
    this.exercicios = this.fcExerciciosService[this.tipoQuestao.funcao](this.qtdExercicios);
  }

  getPercentualCompleto() {
    return (this.indiceExercicioAtual / this.qtdExercicios) * 100;
  }
}
