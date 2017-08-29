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

export class Exercicio {
  enunciado: string;
  respostas: string[];
  indiceRespostaCorreta: number;
}

export class QuestaoSimples {
  operacao: string;
  parcelas: number[];
  resultado: number;
}
