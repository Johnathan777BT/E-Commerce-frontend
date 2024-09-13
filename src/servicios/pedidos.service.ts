import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpStatusCode  } from '@angular/common/http';
import { Observable, catchError, from, retry, throwError } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http:HttpClient) { }


  create(formData: String):Observable<any>
  {
    return this.http.post(environment.urlApi+"api/pedidos/create", formData).pipe(
      catchError(this.handleError)
    )
  }

  createDetail(formData: String):Observable<any>
  {
    return this.http.post(environment.urlApi+"api/pedidos/create-detail", formData).pipe(
      catchError(this.handleError)
    )
  }


  update(pedido: String, id:number):Observable<any>
  {
     
    return this.http.put(environment.urlApi+"api/pedidos/update/"+id, pedido).pipe(
      catchError(this.handleError)
    )
  }
  
  
  updateDetail(producto: String, id:number):Observable<any>
  {
     
    return this.http.put(environment.urlApi+"api/pedidos/update-detail/"+id, producto).pipe(
      catchError(this.handleError)
    )
  }


  getListById(id:number):Observable<any>{
    return this.http.get(environment.urlApi+"api/pedidos/search/"+id).pipe(
      catchError(this.handleError)
    )
  }

  
  getListDetailById(id:number):Observable<any>{
    return this.http.get(environment.urlApi+"api/pedidos/search-detail/"+id).pipe(
      catchError(this.handleError)
    )
  }


  getListOrder(id:number):Observable<any>{
    return this.http.get(environment.urlApi+"api/pedidos/search-by-order/"+id).pipe(
      catchError(this.handleError)
    )
  }
  
  getListAll():Observable<any>
  {
    return this.http.get(environment.urlApi+"api/pedidos/all").pipe(
      catchError(this.handleError)
    )
  }

  
  getList(nombre: String):Observable<any>
  {
    return this.http.get(environment.urlApi+"api/pedidos/all?nombre="+nombre).pipe(
      catchError(this.handleError)
    )
  }


  deleteDetail(id:number):Observable<any>{
    return this.http.delete(environment.urlApi+"api/pedidos/delete-detail/"+id).pipe(
      catchError(this.handleError)
  )
  }


  private handleError(error:HttpErrorResponse): Observable<never>{
    if(error.status== 403){
      console.info('No autorizado');
      return throwError(()=> new Error('No tiene permisos para realizar la solicitud.'));      
    }
    else if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.info('Backend retornó el código de estado ', error.status, error.error);
    
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

}
