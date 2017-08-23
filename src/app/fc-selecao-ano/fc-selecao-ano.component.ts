import { Component, Input, OnInit } from '@angular/core';
import {Ano} from "../models/ano";

@Component({
  selector: 'fc-selecao-ano',
  templateUrl: './fc-selecao-ano.component.html',
  styleUrls: ['./fc-selecao-ano.component.css']
})
export class FcSelecaoAnoComponent implements OnInit {

  @Input() ano: Ano;

  constructor() { }

  ngOnInit() {
  }

  selecionarAno() {

  }

}
