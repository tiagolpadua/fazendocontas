export class IdDescricao {
  _id: string;
  descricao: string;
}

export class Ano extends IdDescricao {
  titulo: string;
  idsTiposQuestoes: string[];
}

export class TipoQuestao extends IdDescricao {
  funcao: string;
}

export enum ETipoEnunciado {
  TEXTO,
  IMAGEM,
  LISTA_DE_IMAGENS,
}

export class Enunciado {
  tipo: ETipoEnunciado;
  conteudo: string;
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
