import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuardService implements CanActivate {

  constructor(public autenticacaoService: AutenticacaoService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    if (!await this.autenticacaoService.checarAutenticado()) {
      await this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
