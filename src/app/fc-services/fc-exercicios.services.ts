import * as _ from 'underscore';

import { Exercicio, QuestaoSimples } from '../fc-models/fc-data.models';

type IGeradorQuestao = () => QuestaoSimples;
type IGeradorEnunciado = (questao: QuestaoSimples) => string;

export class FCExerciciosService {
  // tested
  gerarExerciciosSubtracaoAte10(qtd: number): Exercicio[] {
    return this.gerarExercicios(10, 4,
      () => this.gerarQuestaoAleatoriaSubtracao(1, 10),
      this.gerarEnunciadoQuestaoSimplesInline);
  }

  // tested
  gerarExerciciosSomaAte10(qtd: number): Exercicio[] {
    return this.gerarExercicios(10, 4,
      () => this.gerarQuestaoAleatoriaSoma(1, 10, 2),
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
      const indiceCorreta = _.random(0, 3);
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
  gerarQuestaoAleatoriaSoma(min: number, max: number, qtdParcelas: number): QuestaoSimples {
    const p: number[] = [];
    _.times(qtdParcelas, () => {
      p.push(_.random(min, max));
    });

    return {
      operacao: '+',
      parcelas: p,
      resultado: _.reduce(p, (memo, num) => {
        return memo + num;
      }, 0)
    };
  }

  // tested
  gerarQuestaoAleatoriaSubtracao(min: number, max: number): QuestaoSimples {
    const a = _.random(min, max);
    const b = _.random(min, a);
    return {
      operacao: '-',
      parcelas: [a, b],
      resultado: a - b
    };
  }

  // tested
  curryBinaryFunction<T>(a: T, b: T, f: (x: T, y: T) => T): () => T {
    return () => f(a, b);
  }
}
