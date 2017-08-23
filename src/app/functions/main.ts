interface IExercicio {
  enunciado: string;
  respostas: string[];
  indiceRespostaCorreta: number;
}

interface IQuestaoSimples {
  operacao: string;
  parcelas: number[];
  resultado: number;
}

export class Functions {

  gerarExerciciosSomaAte10(qtd: number): IExercicio[] {
    const ret: IExercicio[] = [];
    for (let i = 0; i < (qtd * 4); i ++) {

      const indiceCorreta = this.generateRandom(0, 3);
      const respostas: string[] = [];
      respostas[indiceCorreta] = (a + b) + '';
      const ex: IExercicio = {
        enunciado: a + ' + ' + b,
        respostas: [],
        indiceRespostaCorreta: indiceCorreta
      };
      ret.push(ex);
    }
    return ret;
  }

  generateRandomSumQuestion() {
    const a = this.generateRandom(0, 10);
    const b = this.generateRandom(0, 10);
    return {
      parcela1: a,
      parcela2: b,
      resposta: a + b
    };
  }

  generateRandom(min: number, max: number): number {
    return parseInt(((Math.random() * 10) + 1) + '', 10);
  }
}
