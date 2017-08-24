import * as _ from 'underscore';

class Exercicio {
  enunciado: string;
  respostas: string[];
  indiceRespostaCorreta: number;

  constructor() {
    this.respostas = [];
  }
}

interface IQuestaoSimples {
  operacao: string;
  parcelas: number[];
  resultado: number;
}

export class Functions {

  gerarExerciciosSomaAte10(qtd: number): Exercicio[] {
    const ret: Exercicio[] = [];
    for (let i = 0; i < qtd; i ++) {
      const q = this.gerarQuestaoAleatoriaSoma();
      const indiceCorreta = this.getRandomInt(0, 3);
      const ex = new Exercicio();
      ex.respostas[indiceCorreta] = q.resultado + '';
      let ind = 0;
      while (ind < 3) {
        if (ex.respostas[ind]) {
          ind++;
        } else {
          _.find ???
        }
      }

      ret.push(ex);
    }
    return ret;
  }

  gerarQuestaoAleatoriaSoma(): IQuestaoSimples {
    const a = this.getRandomInt(0, 10);
    const b = this.getRandomInt(0, 10);
    return {
      operacao: '+',
      parcelas: [a, b],
      resultado: a + b
    };
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
