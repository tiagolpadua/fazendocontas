import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FCService, Exercicio, IQuestaoSimples } from './fc-exercicios-services';

describe('FCService', () => {
  let service: FCService;

  beforeEach(() => {
    service = new FCService();
  });

  it('deve gerar corretamente questões aleatórias de soma entre um valor mínimo e um máximo', () => {
    const arrmin = [0, 3, 100, 1000];
    const arrmax = [10, 100, 500, 10000];

    for (let i = 0; i < 4; i += 1) {
      const min = arrmin[i];
      const max = arrmax[i];
      const q = service.gerarQuestaoAleatoriaSoma(min, max);
      // console.log(JSON.stringify(q));
      expect(q.operacao).toBe('+');
      expect(q.parcelas.length).toBe(2);
      expect(q.parcelas[0]).toBeGreaterThanOrEqual(min);
      expect(q.parcelas[0]).toBeLessThanOrEqual(max);
      expect(q.parcelas[1]).toBeGreaterThanOrEqual(min);
      expect(q.parcelas[1]).toBeLessThanOrEqual(max);
      expect(q.parcelas[0] + q.parcelas[1]).toBe(q.resultado);
    }
  });

  it('deve retornar um número aleatório entre um mínimo e um máximo', () => {
    const arrmin = [0, 3, 100, 1000];
    const arrmax = [10, 100, 500, 10000];

    for (let i = 0; i < 4; i += 1) {
      const min = arrmin[i];
      const max = arrmax[i];
      const rand = service.getRandomInt(min, max);
      expect(rand).toBeGreaterThanOrEqual(min);
      expect(rand).toBeLessThanOrEqual(max);
    }
  });

  it('deve curryficar corretamente uma função binária', () => {
    function soma(a, b) {
      return a + b;
    }
    const curry = service.curryBinaryFunction<number>(5, 7, soma);
    expect(curry()).toBe(12);
  });

  it('deve popular um dado exercício com outras respostas', () => {
    function soma(a, b) {
      return a + b;
    }

    const ex = new Exercicio();

    ex.respostas = [];
    ex.respostas[3] = '10';

    const curry = () => service.gerarQuestaoAleatoriaSoma(0, 10).resultado + '';
    service.popularRespostasAleatorias(ex, curry, 4);
    expect(ex.respostas.length).toBe(4);

    ex.respostas.forEach(e => {
      expect(ex.respostas.filter(e1 => e === e1).length).toBe(1);
    });
  });

  it('deve gerar corretamente exercícios de soma até 10', () => {
    const exercicios = service.gerarExerciciosSomaAte10(5);
    exercicios.forEach(ex => {
      expect(ex.enunciado.length).toBeGreaterThan(0);
      expect(ex.respostas.length).toBe(4);
      expect(ex.indiceRespostaCorreta).toBeGreaterThanOrEqual(0);
      expect(ex.indiceRespostaCorreta).toBeLessThanOrEqual(3);
    });
  });

  it('deve gerar corretamente enunciados para questões simples', () => {
    const questao1: IQuestaoSimples = {
      operacao: '+',
      parcelas: [1, 3],
      resultado: 4
    };

    const questao2: IQuestaoSimples = {
      operacao: '+',
      parcelas: [4, 5, 6],
      resultado: 15
    };

    const questao3: IQuestaoSimples = {
      operacao: '-',
      parcelas: [3, 1],
      resultado: 2
    };

    const questao4: IQuestaoSimples = {
      operacao: '*',
      parcelas: [3, 4],
      resultado: 12
    };

    const questao5: IQuestaoSimples = {
      operacao: '/',
      parcelas: [4, 2],
      resultado: 2
    };

    expect(service.gerarEnunciadoQuestaoSimplesInline(questao1)).toBe('1+3');
    expect(service.gerarEnunciadoQuestaoSimplesInline(questao2)).toBe('4+5+6');
    expect(service.gerarEnunciadoQuestaoSimplesInline(questao3)).toBe('3-1');
    expect(service.gerarEnunciadoQuestaoSimplesInline(questao4)).toBe('3*4');
    expect(service.gerarEnunciadoQuestaoSimplesInline(questao5)).toBe('4/2');
  });

  it('deve gerar corretamente exercícios a partir das funções geradoras', () => {
    const exs = service.gerarExercicios(10, 4, () => service.gerarQuestaoAleatoriaSoma(1, 10), service.gerarEnunciadoQuestaoSimplesInline);
    expect(exs.length).toBe(10);
    exs.forEach(e => {
      expect(e.enunciado.length).toBeGreaterThan(0);
      expect(e.respostas.length === 4);
      e.respostas.forEach(r => expect(r.length).toBeGreaterThan(0));
    });
  });

  it('deve gerar corretamente exercícios de soma até 10', () => {
    const exs = service.gerarExerciciosSomaAte10(10);
    expect(exs.length).toBe(10);
    exs.forEach(e => {
      expect(e.enunciado.length).toBeGreaterThan(0);
      expect(e.enunciado).toContain('+');
      expect(e.respostas.length === 4);
      e.respostas.forEach(r => expect(r.length).toBeGreaterThan(0));
    });
  });
});
