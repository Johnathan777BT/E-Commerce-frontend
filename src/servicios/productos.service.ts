import { Injectable } from '@angular/core';


import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpStatusCode  } from '@angular/common/http';
import { Observable, catchError, from, retry, throwError } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http:HttpClient) { }

  upload(formData: FormData):Observable<any>{
  
    console.log("file--"+formData.get("file"));
    return this.http.post(environment.urlApi+"api/productos/upload", formData);
  }

  create(formData: String):Observable<any>
  {
    return this.http.post(environment.urlApi+"api/productos/create", formData).pipe(
      catchError(this.handleError)
    )
  }

  

  update(producto: String, id:number):Observable<any>
  {
     
    return this.http.put(environment.urlApi+"api/productos/update/"+id, producto).pipe(
      catchError(this.handleError)
    )
  }

  
  getListById(id:number):Observable<any>{
    return this.http.get(environment.urlApi+"api/productos/search/"+id).pipe(
      catchError(this.handleError)
    )
  }


  
  getListAll():Observable<any>
  {
    return this.http.get(environment.urlApi+"api/productos/all").pipe(
      catchError(this.handleError)
    )
  }

  
  getListByName(nombre: String):Observable<any>
  {
    return this.http.get(environment.urlApi+"api/productos/all/"+nombre).pipe(
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
