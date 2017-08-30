import * as _ from 'underscore';

import { Exercicio, QuestaoSimples } from '../fc-models/fc-data.models';

type IGeradorQuestao = () => QuestaoSimples;
type IGeradorEnunciado = (questao: QuestaoSimples) => string;

const QTD_RESPOSTAS_BASE = 4;

export class FCExerciciosService {

  // tested
  gerarExerciciosSimples(qtd: number, funcaoGeradora: (min: number, max: number, qtdParcelas: number) => QuestaoSimples,
    min: number, max: number, qtdParcelas: number): Exercicio[] {
    return this.gerarExercicios(qtd, QTD_RESPOSTAS_BASE,
      () => funcaoGeradora(min, max, qtdParcelas),
      this.gerarEnunciadoQuestaoSimplesInline);
  }

  // tested
  gerarExerciciosSubtracao(qtd: number, min: number, max: number, qtdParcelas: number): Exercicio[] {
    return this.gerarExerciciosSimples(qtd, this.gerarQuestaoAleatoriaSubtracao, min, max, qtdParcelas);
  }

  // gerarExerciciosTabuada2(qtd: number): Exercicio[] {
  //   return this.gerarExerciciosTabuada(qtd, 2, 0, 9);
  // }

  gerarExerciciosTabuada(qtd: number, base: number, min: number, max: number) {

  }

  gerarQuestaoTabuadaComBase(base: number, min: number, max: number): QuestaoSimples {
    const posicaoBase = _.random(0, 1);
    const posicaoFator = posicaoBase === 0 ? 1 : 0;

    const p: number[] = [];
    p[posicaoBase] = base;
    p[posicaoFator] = _.random(min, max);

    return {
      operacao: '*',
      parcelas: p,
      resultado: p[0] * p[1]
    };
  }

  // tested
  gerarExerciciosSubtracaoAte10(qtd: number): Exercicio[] {
    return this.gerarExerciciosSubtracao(qtd, 1, 10, 2);
  }

  // tested
  gerarExerciciosSubtracaoAte100(qtd: number): Exercicio[] {
    return this.gerarExerciciosSubtracao(qtd, 10, 100, 2);
  }

  gerarExerciciosSoma(qtd: number, min: number, max: number, qtdParcelas: number): Exercicio[] {
    return this.gerarExerciciosSimples(qtd, this.gerarQuestaoAleatoriaSoma, min, max, qtdParcelas);
  }

  // tested
  gerarExerciciosSomaAte10(qtd: number): Exercicio[] {
    return this.gerarExerciciosSoma(qtd, 1, 10, 2);
  }

  gerarExerciciosSomaAte100(qtd: number): Exercicio[] {
    return this.gerarExerciciosSoma(qtd, 10, 100, 2);
  }

  // tested
  gerarExercicios(qtdExercicios: number,
    qtdRespostas: number,
    geradorQuestao: IGeradorQuestao,
    geradorEnunciado: IGeradorEnunciado): Exercicio[] {
    const ret: Exercicio[] = [];
    for (let i = 0; i < qtdExercicios; i++) {
      let ex: Exercicio;
      do {
        const q = geradorQuestao();
        const indiceCorreta = _.random(0, 3);
        ex = new Exercicio();
        ex.enunciado = geradorEnunciado(q);
        ex.respostas = [];
        ex.indiceRespostaCorreta = indiceCorreta;
        ex.respostas[indiceCorreta] = q.resultado + '';
        this.popularRespostasAleatorias(ex, () => geradorQuestao().resultado + '', qtdRespostas);

      // Bloqueia a inclusão de exercícios repetidos
      } while (_.find(ret, e => e.enunciado === ex.enunciado));
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
  gerarQuestaoAleatoriaSubtracao(min: number, max: number, qtdParcelas: number): QuestaoSimples {
    const p: number[] = [];
    let memo: number;
    _.times(qtdParcelas, () => {
      if (memo === undefined) {
        memo = _.random(min, max);
        p.push(memo);
      } else {
        const value = _.random(min, memo);
        p.push(value);
        memo -= value;
      }
    });

    return {
      operacao: '-',
      parcelas: p,
      resultado: _.reduce(p.slice(1), (m, num) => {
        return m - num;
      }, p[0])
    };
  }

  // tested
  curryBinaryFunction<T>(a: T, b: T, f: (x: T, y: T) => T): () => T {
    return () => f(a, b);
  }
}
