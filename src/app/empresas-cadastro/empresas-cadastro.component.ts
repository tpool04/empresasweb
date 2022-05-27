import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
 
@Component({
  selector: 'app-empresas-cadastro',
  templateUrl: './empresas-cadastro.component.html',
  styleUrls: ['./empresas-cadastro.component.css']
})
export class EmpresasCadastroComponent implements OnInit {
 
  //atributos
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';
 
  constructor(
    //declarando um atributo auto-inicializado (injeção de dependência)
    private httpClient: HttpClient
  ) { }
 
  ngOnInit(): void {
  }
 
  //criando o modelo de dados do formulário
  formCadastro = new FormGroup({
    nomeFantasia: new FormControl('', [Validators.required]),
    razaoSocial: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', [Validators.required])
  });
 
  //função para exibir as validações dos campos na página
  get form(): any {
    return this.formCadastro.controls;
  }
 
  //função para processar o evento SUBMIT do formulário
  onSubmit(): void {

     //limpar as mensagens
     this.mensagem_sucesso = '';
     this.mensagem_erro = '';
 
    //endereço da api de empresas
    const url = environment.apiEmpresas;
 
    //json contendo os dados do formulário
    const dados = this.formCadastro.value;
 
    this.httpClient.post(url, dados, { responseType: 'text' })
      .subscribe(
        {
          //retorno da API para sucesso
          next: (result) => {
            this.mensagem_sucesso = result;
            this.formCadastro.reset(); //limpar os campos
          },
          //retorno da API para erro
          error: (e) => {
            this.mensagem_erro = e.error;
          }
        }
      )
  }
}
 


