import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
 
@Component({
  selector: 'app-empresas-consulta',
  templateUrl: './empresas-consulta.component.html',
  styleUrls: ['./empresas-consulta.component.css']
})
export class EmpresasConsultaComponent implements OnInit {
 
  //atributos
  empresas: any[] = [];
  mensagem_sucesso: string = '';
  pagina: number = 1;
 
  constructor(
    //declarando atributos do componente que já
    //serão inicializados automaticamente
    private httpClient: HttpClient
  ) { }
 
  //método executado sempre que o componente é aberto
  ngOnInit(): void {
 
    //executar o serviço de consulta de empresas na API
    this.httpClient.get(environment.apiEmpresas)
      .subscribe({
        //resposta de sucesso da API
        next: (result) => {
          //armazenar os dados obtidos dentro do atributo
          this.empresas = result as any[];
        },
        //resposta de erro da API
        error: (e) => {
          console.log(e);
        }
      });
  }
 
  //função executada ao clicar no
  //botão de exclusão de empresa
  onDelete(idEmpresa: number): void {
 
    if (window.confirm('Deseja realmente excluir a empresa selecionada?')) {
 
      //executando o serviço de exclusão na API
      this.httpClient.delete(environment.apiEmpresas + "/" + idEmpresa,
        { responseType: 'text' })
        .subscribe({
          next: (result) => {
            this.mensagem_sucesso = result;
            this.ngOnInit();
          },
          error: (e) => {
            console.log(e);
          }
        })
    }
  }
 
  //função para fazer a paginação
  handlePageChange(event: any): void {
    this.pagina = event;
  }
 
}
 


