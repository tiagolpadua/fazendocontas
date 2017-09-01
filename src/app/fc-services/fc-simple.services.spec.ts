import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FcSimpleService } from './fc-simple.services';

describe('FCService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        FcSimpleService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('deve gerar corretamente exercícios de contagem de imagens até 10',
    inject([FcSimpleService, XHRBackend], (service: FcSimpleService, mockBackend: MockBackend) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(['a', 'b', 'c'])
        })));
      });

      service.getListaO()
        .subscribe(lista => {
          expect(lista.length).toBe(3);
          expect(lista[0]).toBe('a');
          expect(lista[1]).toBe('b');
          expect(lista[2]).toBe('c');
        });

      // service.getLista()
      // .then(lista => {
      //   expect(lista.length).toBe(4);
      //   expect(lista[0]).toBe('a');
      //   expect(lista[1]).toBe('b');
      //   expect(lista[2]).toBe('x');
      // });
    }));
});
