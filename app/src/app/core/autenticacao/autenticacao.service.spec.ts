import { TestBed } from '@angular/core/testing';

import { AutenticacaoService } from './autenticacao.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AutenticacaoService', () => {
  let service: AutenticacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [AutenticacaoService]
    });
    service = TestBed.get(AutenticacaoService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });
});