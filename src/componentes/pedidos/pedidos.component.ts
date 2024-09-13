import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { DatePipe } from '@angular/common';

import { Pedidos } from './pedidos';
import { PedidosService } from '../../servicios/pedidos.service';
import { DataserviceService } from '../../servicios/dataservice.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [NgStyle, NgClass, NgIf, NgFor, ReactiveFormsModule, MatDatepickerModule, MatInputModule, MatNativeDateModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss',
  providers: [ DatePipe]
})
export class PedidosComponent {

  @Output() Id_Pedido:EventEmitter<number> = new EventEmitter();
  errorMessage:String="";
  json:String="";
  pedidos:Pedidos=new Pedidos();
  idPedido:number=0;
  lista: any=[];
  formData = new FormData();
  url:string = "";


  
  registerForm=this.formBuilder.group({
    id:[''],
    numero:['',Validators.required],
    fecha:['', Validators.required],
  
  })

  constructor(private datePipe: DatePipe, private formBuilder:FormBuilder, private router:Router, private activateRoute: ActivatedRoute, 
    private pedidosservice:PedidosService, private dataService:DataserviceService){
    
  }

  get numero()
  {
    return this.registerForm.controls.numero;
  }

  get fecha()
  {
    return this.registerForm.controls.fecha;
  }

  saveData() {

    if (this.registerForm.valid)
      {  
          this.pedidos.number= Number(this.registerForm.controls.numero.value!);
          let fecha_formateada=  this.registerForm.controls.fecha.value!;
          let fecha_nueva = fecha_formateada.toString();
          let v= this.datePipe.transform(fecha_nueva,"dd-MM-yyyy"); //esto funka
          
          this.pedidos.date=v!;
         
        this.json = JSON.stringify(  this.pedidos );
  
        console.log("json: "+this.json);
     
        let idtemp = this.dataService.getDatos();
        console.log("idtemp: "+idtemp[0]);
        if(idtemp[0]=="" || idtemp[0]=="0"){

         this.pedidosservice.create(this.json).subscribe(
          response=> {

            console.log("response:"+response);
            this.idPedido= response['id'];
            console.log("response id pedido:"+this.idPedido);           

           this.dataService.setDato1(this.idPedido.toString());
   
            this.router.navigate(['listarproductos']);

              },
        
      );
       }else{
        alert("Ya existe un pedido en Proceso");
       }
      }
    }

}
