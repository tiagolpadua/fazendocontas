import * as _ from 'underscore';

import { Exercicio, QuestaoSimples } from '../fc-models/fc-data.models';

type IGeradorQuestao = () => QuestaoSimples;
type IGeradorEnunciado = (questao: QuestaoSimples) => string;

export class FCExerciciosService {
  // tested
  gerarExerciciosSomaAte10(qtd: number): Exercicio[] {
    return this.gerarExercicios(10, 4,
      () => this.gerarQuestaoAleatoriaSoma(1, 10),
      this.gerarEnunciadoQuestaoSimplesInline);
  }

  // tested
  gerarExercicios(qtdExercicios: number,
    qtdRespostas: number,
    geradorQuestao: IGeradorQuestao,
    geradorEnunciado: IGeradorEnunciado): Exercicio[] {
    const ret: Exercicio[] = [];
    for (let i = 0; i < qtdExercicios; i ++) {
      const q = geradorQuestao();
      const indiceCorreta = this.getRandomInt(0, 3);
      const ex = new Exercicio();
      ex.enunciado = geradorEnunciado(q);
      ex.respostas = [];
      ex.indiceRespostaCorreta = indiceCorreta;
      ex.respostas[indiceCorreta] = q.resultado + '';
      this.popularRespostasAleatorias(ex, () => geradorQuestao().resultado + '', qtdRespostas);
      ret.push(ex);
    }
    return ret;
  }

  // tested
  gerarEnunciadoQuestaoSimplesInline(questao: QuestaoSimples): string {
    return questao.parcelas.join(questao.operacao);
  }

  // tested
  popularRespostasAleatorias(ex: Exercicio, funcaoGeradora: () => string, qtd: number): void {
    for (let i = 0; i < qtd; i += 1) {
      if (ex.respostas[i] !== undefined) {
        continue;
      }

      let res;
      do {
        res = funcaoGeradora();
        if (ex.respostas.indexOf(res) !== -1) {
          res = undefined;
        }
      } while (res === undefined);
      ex.respostas[i] = res;
    }
  }

  // tested
  gerarQuestaoAleatoriaSoma(min: number, max: number): QuestaoSimples {
    const a = this.getRandomInt(min, max);
    const b = this.getRandomInt(min, max);
    return {
      operacao: '+',
      parcelas: [a, b],
      resultado: a + b
    };
  }

  // tested
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // tested
  curryBinaryFunction<T>(a: T, b: T, f: (x: T, y: T) => T): () => T {
    return () => f(a, b);
  }
}
