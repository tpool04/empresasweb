import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

 
@Component({
  selector: 'app-empresas-edicao',
  templateUrl: './empresas-edicao.component.html',
  styleUrls: ['./empresas-edicao.component.css']
})
export class EmpresasEdicaoComponent implements OnInit {
 
  //atributos
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';
 
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }
 
  //criando a estrutura do formulário
  formEdicao = new FormGroup({
    idEmpresa: new FormControl('', [Validators.required]),
    nomeFantasia: new FormControl('', [Validators.required]),
    razaoSocial: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', [Validators.required]),
  });
 
  //função para que possamos acessar as mensagens
  //de erro dos campos do formulário na página
  get form(): any {
    return this.formEdicao.controls;
  }
 
  ngOnInit(): void {
 
    //capturando o id da empresa enviado pela URL
    var idEmpresa = this.activatedRoute.snapshot.paramMap.get('idEmpresa');
 
    //consultando os dados da empresa na API
    this.httpClient.get(environment.apiEmpresas + "/" + idEmpresa)
      .subscribe({
        next: (result) => {
          //preenchendo os campos do formulário com os dados
          //obtidos da consulta feita na API
          this.formEdicao.patchValue(result);
        },
        error: (e) => {
          console.log(e);
        }
      })
  }
 
  //função para executar a atualização dos dados da empresa
  onSubmit(): void {
 
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';
 
    this.httpClient.put(environment.apiEmpresas, this.formEdicao.value,
      { responseType: 'text' })
      .subscribe({
        next: (result) => {
          this.mensagem_sucesso = result;
          
        },
        error: (e) => {
          this.mensagem_erro = e.error;
        }
      });
  }
 
}
 


