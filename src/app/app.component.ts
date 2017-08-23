import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Ano } from './models/ano';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  anos: Ano[];

  constructor(private http: Http) {
    this.getAnos()
      .then(anos => {
        this.anos = anos;
        console.log(this.anos.length);
      })
      .catch(err => {
        window.alert(err);
      });
  }

  getAnos(): Promise<Ano[]> {
    return this.http.get('/assets/api/anos.json')
      .map((res: Response) => res.json())
      .toPromise();
  }
}