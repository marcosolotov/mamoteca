import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    conteudo: ' ',
    autoria: ' ',
    modelo: ' '
  }

  constructor(private service: PensamentoService,
              private router: Router) { }

  ngOnInit(): void {
  }

  criarPensamento() {
    this.service.criar(this.pensamento).subscribe(() => {
      this.router.navigate(['/listarPensamento'])
    })
    //aqui o método subscribe espera uma função de callback como parâmetro, a função só é executado no retorno do subscribe. Além disso, usa-se uma arrow function para que o this fique legível no escopo da classe e não da função.
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

}
