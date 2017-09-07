export class IdDescricao {
  _id: string;
  descricao: string;
}

export class Ano extends IdDescricao {
  titulo: string;
  idsTiposQuestoes: string[];
}

export enum ETipoQuestao {
  SOMA_ATE_10 = 100,
  SOMA_ATE_100 = 101,
  SUBRACAO_ATE_10 = 102,
  SUBRACAO_ATE_100 = 103,
  CONTA_IMAGENS_ATE_10 = 104
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
  TEXTO = 100,
  IMAGEM = 101,
  LISTA_DE_IMAGENS = 102,
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
