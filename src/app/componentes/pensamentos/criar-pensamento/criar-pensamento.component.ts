import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from '../criar-pensamento/minusculoValidator';
@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  formulario!: FormGroup

  constructor(private service: PensamentoService,
              private router: Router,
              private formBuider: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuider.group({
      conteudo: ['', Validators.compose([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
      autoria: ['', Validators.compose([Validators.required, Validators.minLength(3), minusculoValidator])],
      modelo: ['modelo1']
    })
  }

  criarPensamento() {
    if(this.formulario.valid) {
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      })
    }
    //aqui o método subscribe espera uma função de callback como parâmetro, a função só é executado no retorno do subscribe. Além disso, usa-se uma arrow function para que o this fique legível no escopo da classe e não da função.
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao() {
    if(this.formulario.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }

}
