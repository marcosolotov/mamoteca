import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamento: Pensamento[] = [ ]
  listaFavorito: Pensamento[] = []
  titulo: string = 'Meu Mural'

  paginaAtual: number = 1
  haMaisPensamentos: boolean = true
  filtro: string = ''
  favorito: boolean = false

  constructor(
    private service: PensamentoService,
    private router: Router
    ) { }

  ngOnInit(): void {
    //OnInit roda toda vez que o component é criado
    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe((listaPensamento) => {
      this.listaPensamento = listaPensamento
    })
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual, this.filtro, this.favorito).subscribe(listaPensamentos => {
      this.listaPensamento.push(...listaPensamentos)
      if(!listaPensamentos.length) {
        this.haMaisPensamentos = false
      }
    })
  }
  pesquisarPensamentos() {
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe(listaPensamento => {
      this.listaPensamento = listaPensamento
    })
  }

  recarregarComponente() {

    this.favorito = false
    this.paginaAtual = 1
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

  listarFavoritos() {
    this.titulo = 'Meus Favoritos'
    this.favorito = true
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe(
      listaPensamentosFavoritos => {
        this.listaPensamento = listaPensamentosFavoritos
        this.listaFavorito = listaPensamentosFavoritos
      } )
  }
}
