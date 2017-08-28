export class IdDescricao {
  _id: string;
  descricao: string;
}

export class Ano extends IdDescricao {
  titulo: string;
  idsTiposQuestoes: number[];
}

export class TipoQuestao extends IdDescricao {
  funcao: string;
}
