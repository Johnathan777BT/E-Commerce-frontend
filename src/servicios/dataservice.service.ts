import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  
  private datos =[''];

  getDatos()
  {
     return [...this.datos];
  }

 constructor() { }

 setDato1(dato:string){
   this.datos[0]= dato;
 }

 setDato2(dato:string){
   this.datos[1]= dato;
 }


}
