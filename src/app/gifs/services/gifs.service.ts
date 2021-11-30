import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root', //Funciona en cualquier componente. Eleva el servicio al nivel global de la app
})
export class GifsService {
  private _historial: string[] = [];
  private apiKey: string = 'AL6IzVQbjQ69spj4QiasbeMnY114fjmg';

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {}

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    // HTTP trabaja en base a observables! Lo que nos da un mayor control sobre la promesa
    this.http
      .get<SearchGifsResponse>(
        `http://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`
      )
      //Se ejecuta cuando se tenga la resolución de la promesa
      .subscribe(resp => {
        console.log(resp);
        this.resultados = resp.data;
      });
  }
}
