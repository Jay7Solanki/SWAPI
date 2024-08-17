import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SWAPIService {
  constructor(private http: HttpClient) {}

  getAllCharacterList(options: any): Observable<any> {
    const url = 'https://swapi.dev/api/people';
    return this.http.get(url, options);
  }

  getCharacterById(id: number): Observable<any> {
    const url = `https://swapi.dev/api/people/${id}`;
    return this.http.get(url);
  }

  getFilmDetail = (url: string): Observable<any> => {
    return this.http.get(url);
  };

  getAllFilmList = (): Observable<any> => {
    const url = 'https://swapi.dev/api/films';
    return this.http.get(url);
  }

  getAllSpecies = (): Observable<any> => {
    const url = 'https://swapi.dev/api/species';
    return this.http.get(url);
  }

  getSpeciesDetail = (url: string): Observable<any> => {
    return this.http.get(url);
  }
}