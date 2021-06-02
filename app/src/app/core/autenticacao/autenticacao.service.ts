import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private apiUrl='https://dev.sitemercado.com.br/api/login'; 
  public retornoLogin: any;
  private httpOptions: any;

  constructor(private httpclient: HttpClient) {}  

  setarBasicAuthentication(username: string, password: string){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    };
  }

  async checarAutenticado(): Promise<boolean> {
    let usuarioAutenticado = JSON.parse(localStorage.getItem('usuarioAutenticado'));

    if(usuarioAutenticado)
    {
      return usuarioAutenticado.success;
    }
    return false;
  }

  async login(usuario: string, senha: string): Promise<any> {
    this.setarBasicAuthentication(usuario, senha);

    let login = { username: usuario, password: senha };
    let loginRealizado = await this.httpclient.post<any>(this.apiUrl, login, this.httpOptions).toPromise(); 
    
    this.retornoLogin = loginRealizado;
    
    let sucesso = loginRealizado['success'];

    if(sucesso)
    {
      localStorage.setItem('usuarioAutenticado', JSON.stringify(loginRealizado));
    }
  }

  async logout(): Promise<void> {
    try {
      localStorage.removeItem('usuarioAutenticado');
    } catch (err) {
      console.error(err);
    }
  }
}
