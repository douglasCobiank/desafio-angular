import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { TituloDto } from '../models/titulo.model';

@Injectable({ providedIn: 'root' })
export class TituloService {
  private base = `${environment.apiUrl}/api/divida`;

  constructor(private http: HttpClient) {}

  postDivida(divida : TituloDto) {
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    });
    return this.http.post<Observable<string>>(`${this.base}/cadastrar`, divida, { headers });
  }

  getDivida() {
    return this.http.get<TituloDto[]>(`${this.base}/buscar-dividas`);
  }

  getDividaById(id: number) {
    return this.http.get<TituloDto>(`${this.base}/buscar-dividas/${id}`);
  }

}
