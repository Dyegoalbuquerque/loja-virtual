import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutenticacaoService } from '../../../../core/autenticacao/autenticacao.service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  public loginInvalido = false;
  public loginMensagem = '';
  private retornoUrl: string;

  constructor(private formbuilder: FormBuilder, private route: ActivatedRoute,
              private router: Router, private autenticacaoService: AutenticacaoService,
              private snackBar: MatSnackBar) 
  {
    this.retornoUrl = this.route.snapshot.queryParams.returnUrl || '/produto/listagem';
    let itemGroup = { usuario: ['', Validators.required], senha: ['', Validators.required]};
    this.formulario = this.formbuilder.group(itemGroup);
  }

  mostrarMensagem(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao,{
      duration: 5 * 1000,
    });
  }

  async ngOnInit(): Promise<void> {

    if (await this.autenticacaoService.checarAutenticado()) {
        await this.router.navigate([this.retornoUrl]);
    }
  }

  async submeter(): Promise<void> {
    this.loginInvalido = false;

    if (this.formulario.valid) {
      try {
        const usuario = this.formulario.get('usuario').value;
        const senha = this.formulario.get('senha').value;

        await this.autenticacaoService.login(usuario, senha);

        if(await this.autenticacaoService.checarAutenticado())
        {
          this.loginInvalido = false;
          await this.router.navigate([this.retornoUrl]);
          location.reload();
        }
        else
        {
          this.loginMensagem = this.autenticacaoService.retornoLogin.error;
          this.loginInvalido = true;
        }
      } catch (err) {
        this.loginInvalido = true;
        console.error(err, "Falha no envio", "Login formulário")
        this.mostrarMensagem("Falha no envio", "Produto formulário");
      }
    }
  }
}
