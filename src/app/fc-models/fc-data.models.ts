export class IdDescricao {
  _id: string;
  descricao: string;
}

export class Ano extends IdDescricao {
  titulo: string;
  idsTiposQuestoes: string[];
}

export enum ETipoQuestao {
  SOMA_ATE_10 = 3671900998,
  SOMA_ATE_100 = 4287083202,
  SOMA_ATE_1000 = 882815734,
  SOMA_ATE_1000000 = 3270231330,
  SUBTRACAO_ATE_10 = 1349495276,
  SUBTRACAO_ATE_100 = 2076730708,
  SUBTRACAO_ATE_1000 = 1081580652,
  SUBTRACAO_ATE_1000000 = 2553196628,
  CONTA_IMAGENS_ATE_10 = 2549036322,
  MULTIPLICACAO_ATE_10 = 80614163,
  MULTIPLICACAO_ATE_100 = 3009945625,
}

export interface IDescritorTipoQuestao {
  funcaoGeradoraExercicio: TFuncaoGeradoraExercicio;
  // funcaoRenderizadoraEnunciado: TFuncaoRenderizadora;
  // funcaoRenderizadoraResposta: TFuncaoRenderizadora;
}

export class TipoQuestao extends IdDescricao {
  tipo: ETipoQuestao;
}

export enum ETipoEnunciado {
  TEXTO = 672487715,
  IMAGEM = 2116065589,
  LISTA_DE_IMAGENS = 3099151367,
}

export class Enunciado {
  tipo: ETipoEnunciado;
  conteudo: any;
}

export class Exercicio {
  enunciado: Enunciado;
  respostas: string[];
  indiceRespostaCorreta: number;
}

export class QuestaoSimples {
  operacao: string;
  parcelas: number[];
  resultado: number;
}

export type TFuncaoGeradoraQuestao = () => QuestaoSimples;
export type TFuncaoGeradoraEnunciado = (questao: QuestaoSimples) => Enunciado;
export type TFuncaoGeradoraQuestaoAritmetica = (min: number, max: number, qtdParcelas: number) => QuestaoSimples;
export type TFuncaoGeradoraExercicio = (qtd: number) => Promise<Exercicio[]>;
export type TFuncaoRenderizadora = (Exercicio) => QuestaoSimples;
