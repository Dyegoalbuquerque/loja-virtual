import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../produto.service';

@Component({
  selector: 'produto-formulario-component',
  templateUrl: './produto.formulario.component.html',
  styleUrls: ['./produto.formulario.component.css']
})

export class ProdutoFormularioComponent  {

  constructor(private route: ActivatedRoute, private formbuilder: FormBuilder,
              private router: Router, private produtoService: ProdutoService,
              private snackBar: MatSnackBar) 
  {
    let itemGroup = { nome: ['', Validators.required], 
                      valor: ['', Validators.required], 
                      urlImagem: ['', Validators.required]};
                      
    this.formulario = this.formbuilder.group(itemGroup);
    this.produto = new Produto();
  }

  formulario: FormGroup;
  produtoId: number;
  produto: Produto;

  mostrarMensagem(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao,{
      duration: 5 * 1000,
    });
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.produtoId = params['id'];

      if(this.produtoId){
        this.produto = await this.produtoService.obterProduto(this.produtoId);
      }
    });
  }

  async redirecionarListagem(){
    await this.router.navigate(['/produto/listagem']);
  }

  async submeter(){

    if (this.formulario.valid) {
      try {
        if(this.produto.id){
          this.produto = await this.produtoService.atualizarProduto(this.produto, this.produto.id);
        }else{
          this.produto = await this.produtoService.adicionarProduto(this.produto);
        }
        this.mostrarMensagem("Enviado com sucesso", "Produto formulário");
        await this.redirecionarListagem();
       } catch (err) {
        this.mostrarMensagem("Falha no envio", "Produto formulário");
       }
    }
  }
}