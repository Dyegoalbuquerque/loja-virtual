import { TestBed } from '@angular/core/testing';

import { AutenticacaoGuardService } from './autenticacao.guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AutenticacaoGuardService', () => {
  let service: AutenticacaoGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [AutenticacaoGuardService]
    });
    service = TestBed.get(AutenticacaoGuardService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });
});
