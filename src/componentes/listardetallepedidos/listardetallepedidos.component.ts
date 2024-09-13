import { NgFor, NgIf, NgStyle, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterLink } from  '@angular/router';

import { PedidosService } from '../../servicios/pedidos.service';
import { Pedidos } from '../pedidos/pedidos';
import { DataserviceService } from '../../servicios/dataservice.service';

@Component({
  selector: 'app-listardetallepedidos',
  standalone: true,
  imports: [NgStyle, NgIf, NgFor, ReactiveFormsModule, RouterLink, CurrencyPipe],
  templateUrl: './listardetallepedidos.component.html',
  styleUrl: './listardetallepedidos.component.scss'
})
export class ListardetallepedidosComponent implements OnInit {


  id:number=0;
  nombre_campo:string=" ";
  json:String="";
  errorMessage:String="";
  lista: any[] = [];
  total:number=0;
  pedidos:Pedidos = new Pedidos();

  constructor(private formBuilder: FormBuilder, private router:Router, private pedidosservice:PedidosService,  private dataService:DataserviceService)
  {

  }

  getOrderDetail(): void{
    
    let idtemp = this.dataService.getDatos();
   
   this.id= Number(idtemp);
    
   

    this.pedidosservice.getListOrder(this.id).subscribe(
      (data) => {
     
      console.log(data);
      if(data.length==0 || !data){
        this.lista = [];
        
      }
      else {
        
        this.lista = data;  
        for(let i=0; i < data.length; i++){
           this.total+=data[i]['total'];
        }    
       
      }

      },
      error => {
        console.log("error listando detalle pedidos");
      // Aquí se debería tratar el error, bien mostrando un mensaje al usuario o de la forma que se desee.
      }
    );


    console.log(this.lista);
    


  }


  ngOnInit(): void {
    this.getOrderDetail();
  }

  saveData(): void {

        this.pedidos.id = this.id;
        this.pedidos.total = this.total;
        this.pedidos.date = "11-02-2024";

        this.json = JSON.stringify(  this.pedidos );
  
        console.log("json: "+this.json);

        this.pedidosservice.update(this.json, this.id).subscribe(
          response=> {

            console.log("response:"+response);
            this.id= 0;
          
            localStorage.removeItem("id");
            
            this.dataService.setDato1("0");
            alert('Pedido Pagado con Exito!');
            this.router.navigate(['listarproductos']);


            
              },
        
      );

  }


  delete(com: any) {
   

    const confirmar=confirm("Esta Usted seguro que desea eliminar este registro?");

    if (confirmar)
    { 
        console.log("id: "+com.id);

     
      this.pedidosservice.deleteDetail(com.id).subscribe({
      next:() => {
       
       alert('Registro Eliminado con Exito!');
      
       this.total=0;
       this.getOrderDetail();
       
      
       this.router.navigate(['listardetallepedidos']);

       
      },
      error:(errorData)=> {
        console.error(errorData);
        if(errorData.status!=200){ alert(''+errorData);
        }
      },
      complete: () => {
      
      }

    })
  }
  
 }





}
