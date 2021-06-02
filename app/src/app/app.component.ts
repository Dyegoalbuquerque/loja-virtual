import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from './core/autenticacao/autenticacao.service';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titulo = "App component";
  autenticado = false;

  constructor(public autenticacaoService: AutenticacaoService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.autenticado = await this.autenticacaoService.checarAutenticado();
  }

  async logout(): Promise<void> {
    await this.autenticacaoService.logout();
    await this.router.navigate(['/']);
    this.autenticado = false;
  }
}
