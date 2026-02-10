import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IbgeState {
  id: number;
  nome: string;
  sigla: string;
}

export interface IbgeCity {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root',
})
export class IbgeLocalidadesService {
  private readonly baseUrl =
    'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(private http: HttpClient) {}

  getStates(): Observable<IbgeState[]> {
    return this.http.get<IbgeState[]>(`${this.baseUrl}/estados?orderBy=nome`);
  }

  getCitiesByState(stateId: number): Observable<IbgeCity[]> {
    return this.http.get<IbgeCity[]>(
      `${this.baseUrl}/estados/${stateId}/municipios?orderBy=nome`,
    );
  }
}
