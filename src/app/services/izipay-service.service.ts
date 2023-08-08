import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class IzipayServiceService {

  constructor(
    private http: HttpClient
  ) { }
  
 
  
  getTokenSession(transactionId: string, options: any): Observable<any> {
    const url = 'http://rsdev.site:8081/erp/cita/pagos/izipaytoken';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({
      datosReserva: options.datosReserva,
      currency: options.currency ,
      amount: options.amount 
    });

    return this.http.post(url, body, { headers }).pipe(
      map(response => {
        return response;
      })
    );
  }
}
