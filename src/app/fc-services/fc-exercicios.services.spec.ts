import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import * as _ from 'underscore';

import { Enunciado, ETipoEnunciado, Exercicio, QuestaoSimples } from '../fc-models/fc-data.models';
import { FCExerciciosService } from './fc-exercicios.services';
import { FcDataService } from './fc-data.services';

describe('FCService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        FcDataService,
        FCExerciciosService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('deve gerar corretamente exercícios de contagem de imagens até 10',
    inject([FCExerciciosService, XHRBackend], (service: FCExerciciosService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(['a', 'b', 'c'])
        })));
      });

      service.gerarExerciciosContagemImagensAte10(10)
        .then(exs => {
          expect(exs.length).toBe(10);
          exs.forEach(e => {
            expect(e.enunciado.tipo).toBe(ETipoEnunciado.LISTA_DE_IMAGENS);
            expect(e.enunciado.conteudo).toBeDefined();
            expect(e.respostas.length).toBe(4);
            e.respostas.forEach(r => expect(r.length).toBeGreaterThan(0));
          });
        });
    }));

  it('deve gerar corretamente exercicios de contagem de imagens',
    inject([FCExerciciosService], (service: FCExerciciosService) => {
      const imgs = ['a', 'b', 'c'];
      const exs = service.gerarExerciciosContagemImagens(10, imgs, 1, 10);
      expect(exs.length).toBe(10);
      _.forEach(exs, ex => {
        expect(ex.enunciado.tipo).toBe(ETipoEnunciado.LISTA_DE_IMAGENS);
        expect(ex.enunciado.conteudo).toBeDefined();
        expect(ex.indiceRespostaCorreta).toBeGreaterThanOrEqual(0);
        expect(ex.indiceRespostaCorreta).toBeLessThanOrEqual(3);
        _.each(ex.respostas, r => {
          expect(parseInt(r, 10)).toBeGreaterThanOrEqual(1);
          expect(parseInt(r, 10)).toBeLessThanOrEqual(10);
        });
      });
    }));

  it('deve gerar corretamente exercicios simples',
    inject([FCExerciciosService], (service: FCExerciciosService) => {
      const exs = service.gerarExerciciosAritmeticaSimples(10, service.gerarQuestaoAleatoriaSubtracao, 0, 10, 2);
      expect(exs.length).toBe(10);
    }));

  it('deve gerar corretamente exercicios de subtração',
    inject([FCExerciciosService], (service: FCExerciciosService) => {
      const exs = service.gerarExerciciosSubtracao(10, 0, 10, 2);
      expect(exs.length).toBe(10);
    }));

  it('deve gerar corretamente questões aleatórias de soma entre um valor mínimo e um máximo',
    inject([FCExerciciosService], (service: FCExerciciosService) => {
      const arrmin = [0, 3, 100, 1000];
      const arrmax = [10, 100, 500, 10000];

      for (let i = 0; i < 4; i += 1) {
        const min = arrmin[i];
        const max = arrmax[i];
        const q = service.gerarQuestaoAleatoriaSoma(min, max, 2);
        expect(q.operacao).toBe('+');
        expect(q.parcelas.length).toBe(2);
        expect(q.parcelas[0]).toBeGreaterThanOrEqual(min);
        expect(q.parcelas[0]).toBeLessThanOrEqual(max);
        expect(q.parcelas[1]).toBeGreaterThanOrEqual(min);
        expect(q.parcelas[1]).toBeLessThanOrEqual(max);
        expect(q.parcelas[0] + q.parcelas[1]).toBe(q.resultado);
      }
    }));

  it('deve gerar corretamente questões aleatórias de subtração entre um valor mínimo e um máximo',
    inject([FCExerciciosService], (service: FCExerciciosService) => {
      const arrmin = [0, 3, 100, 1000];
      const arrmax = [10, 100, 500, 10000];

      for (let i = 0; i < 4; i += 1) {
        const min = arrmin[i];
        const max = arrmax[i];
        const q = service.gerarQuestaoAleatoriaSubtracao(min, max, 2);
        expect(q.operacao).toBe('-');
        expect(q.parcelas.length).toBe(2);
        expect(q.parcelas[0]).toBeGreaterThanOrEqual(min);
        expect(q.parcelas[0]).toBeLessThanOrEqual(max);
        expect(q.parcelas[1]).toBeGreaterThanOrEqual(min);
        expect(q.parcelas[1]).toBeLessThanOrEqual(max);
        expect(q.parcelas[0] - q.parcelas[1]).toBe(q.resultado);
      }
    }));

  it('deve popular um dado exercício com outras respostas',
    inject([FCExerciciosService], (service: FCExerciciosService) => {
      function soma(a, b) {
        return a + b;
      }

      const ex = new Exercicio();

      ex.respostas = [];
      ex.respostas[3] = '10';

      const curry = () => service.gerarQuestaoAleatoriaSoma(0, 10, 2).resultado + '';
      service.popularRespostasAleatorias(ex, curry, 4);
      expect(ex.respostas.length).toBe(4);

      ex.respostas.forEach(e => {
        expect(ex.respostas.filter(e1 => e === e1).length).toBe(1);
      });
    }));

  it('deve gerar corretamente exercícios de soma',
    inject([FCExerciciosService], (service: FCExerciciosService) => {
      const exercicios = service.gerarExerciciosSoma(10, 0, 10, 2);
      exercicios.forEach(ex => {
        expect(ex.enunciado.tipo).toBe(ETipoEnunciado.TEXTO);
        expect(ex.enunciado.conteudo.length).toBeGreaterThan(0);
        expect(ex.respostas.length).toBe(4);
        expect(ex.indiceRespostaCorreta).toBeGreaterThanOrEqual(0);
        expect(ex.indiceRespostaCorreta).toBeLessThanOrEqual(3);
      });
    }));

  it('deve gerar corretamente exercícios de subtracao até 10',
    inject([FCExerciciosService], (service: FCExerciciosService) => {
      service.gerarExerciciosSubtracaoAte10(5)
        .then(exercicios => {
          exercicios.forEach(ex => {
            expect(ex.enunciado.tipo).toBe(ETipoEnunciado.TEXTO);
            expect(ex.enunciado.conteudo.length).toBeGreaterThan(0);
            expect(ex.respostas.length).toBe(4);
            expect(ex.indiceRespostaCorreta).toBeGreaterThanOrEqual(0);
            expect(ex.indiceRespostaCorreta).toBeLessThanOrEqual(3);
          });
        });
    }));

  it('deve gerar corretamente exercícios de subtracao até 100',
    inject([FCExerciciosService], (service: FCExerciciosService) => {
      service.gerarExerciciosSubtracaoAte100(5)
        .then(exercicios => {
          exercicios.forEach(ex => {
            expect(ex.enunciado.tipo).toBe(ETipoEnunciado.TEXTO);
            expect(ex.enunciado.conteudo.length).toBeGreaterThan(0);
            expect(ex.respostas.length).toBe(4);
            expect(ex.indiceRespostaCorreta).toBeGreaterThanOrEqual(0);
            expect(ex.indiceRespostaCorreta).toBeLessThanOrEqual(3);
          });
        });
    }));

  it('deve gerar corretamente enunciados para questões simples',
    inject([FCExerciciosService], (service: FCExerciciosService) => {
      const questao1: QuestaoSimples = {
        operacao: '+',
        parcelas: [1, 3],
        resultado: 4
      };

      const questao2: QuestaoSimples = {
        operacao: '+',
        parcelas: [4, 5, 6],
        resultado: 15
      };

      const questao3: QuestaoSimples = {
        operacao: '-',
        parcelas: [3, 1],
        resultado: 2
      };

      const questao4: QuestaoSimples = {
        operacao: '*',
        parcelas: [3, 4],
        resultado: 12
      };

      const questao5: QuestaoSimples = {
        operacao: '/',
        parcelas: [4, 2],
        resultado: 2
      };

      expect(service.gerarEnunciadoQuestaoSimplesInline(questao1).conteudo).toBe('1+3');
      expect(service.gerarEnunciadoQuestaoSimplesInline(questao2).conteudo).toBe('4+5+6');
      expect(service.gerarEnunciadoQuestaoSimplesInline(questao3).conteudo).toBe('3-1');
      expect(service.gerarEnunciadoQuestaoSimplesInline(questao4).conteudo).toBe('3*4');
      expect(service.gerarEnunciadoQuestaoSimplesInline(questao5).conteudo).toBe('4/2');
    }));

  it('deve gerar corretamente exercícios a partir das funções geradoras',
    inject([FCExerciciosService], (service: FCExerciciosService) => {
      const exs = service.gerarExercicios(10, 4, () =>
        service.gerarQuestaoAleatoriaSoma(1, 10, 2), service.gerarEnunciadoQuestaoSimplesInline);

      expect(exs.length).toBe(10);
      exs.forEach(e => {
        expect(e.enunciado.tipo).toBe(ETipoEnunciado.TEXTO);
        expect(e.enunciado.conteudo.length).toBeGreaterThan(0);
        expect(e.respostas.length === 4);
        e.respostas.forEach(r => expect(r.length).toBeGreaterThan(0));
      });
    }));

  it('deve gerar corretamente exercícios de soma até 10',
    inject([FCExerciciosService], (service: FCExerciciosService) => {
      service.gerarExerciciosSomaAte10(10)
        .then(exercicios => {
          expect(exercicios.length).toBe(10);
          exercicios.forEach(e => {
            expect(e.enunciado.tipo).toBe(ETipoEnunciado.TEXTO);
            expect(e.enunciado.conteudo.length).toBeGreaterThan(0);
            expect(e.enunciado.conteudo).toContain('+');
            expect(e.respostas.length === 4);
            e.respostas.forEach(r => expect(r.length).toBeGreaterThan(0));
          });
        });
    }));
});
