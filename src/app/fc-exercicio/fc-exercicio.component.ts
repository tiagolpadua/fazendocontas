import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fc-exercicio',
  templateUrl: './fc-exercicio.component.html',
  styleUrls: ['./fc-exercicio.component.css']
})
export class FcExercicioComponent implements OnInit {

  funcao: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.funcao = this.route.snapshot.params['bank'];
  }

}
