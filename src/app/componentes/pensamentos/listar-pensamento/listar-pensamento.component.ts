import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamento: Pensamento[] = [ ]

  paginaAtual: number = 1
  haMaisPensamentos: boolean = true
  filtro: string = ''

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
    //OnInit roda toda vez que o component é criado
    this.service.listar(this.paginaAtual, this.filtro).subscribe((listaPensamento) => {
      this.listaPensamento = listaPensamento
    })
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual, this.filtro).subscribe(listaPensamentos => {
      this.listaPensamento.push(...listaPensamentos)
      if(!listaPensamentos.length) {
        this.haMaisPensamentos = false
      }
    })
  }
  pesquisarPensamentos() {
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro).subscribe(listaPensamento => {
      this.listaPensamento = listaPensamento
    })
  }
}
