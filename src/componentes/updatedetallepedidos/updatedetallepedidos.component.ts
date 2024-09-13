import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf, NgStyle, CurrencyPipe } from '@angular/common';
import { DetallePedidos } from '../pedidos/detallepedidos';
import { PedidosService } from '../../servicios/pedidos.service';
import { ProductosService } from '../../servicios/productos.service';
import { Pedidos } from '../pedidos/pedidos';
import { DataserviceService } from '../../servicios/dataservice.service';

@Component({
  selector: 'app-updatedetallepedidos',
  standalone: true,
  imports: [NgStyle, NgClass, NgIf, NgFor, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './updatedetallepedidos.component.html',
  styleUrl: './updatedetallepedidos.component.scss'
})
export class UpdatedetallepedidosComponent implements OnInit{

  errorMessage:String="";
  json:String="";
  detallePedidos:DetallePedidos=new DetallePedidos();
  pedido:Pedidos=new Pedidos();
  idPedido:number=0;
  lista: any=[];
  lista2: any=[];
  formData = new FormData();
  url:string = "";
  idDetalle:number=0;
  prodId:number=0;

constructor( private formBuilder:FormBuilder, private router:Router, private activateRoute: ActivatedRoute, private dataservice:DataserviceService, private pedidosservice:PedidosService, private productosservice:ProductosService){
  this.idDetalle = activateRoute.snapshot.params['id']; 

}


  ngOnInit(): void {
    
    this.pedidosservice.getListDetailById(this.idDetalle).subscribe({
      next: (userData) => {
                  
         this.lista2 = userData;

         console.log("userData;"+this.lista2.productId);
         this.prodId= this.lista2.productId;       

         this.productosservice.getListById(this.prodId).subscribe(
          {

            next: (userData2) => {
              this.lista = userData2;
            }
          }
         )


      },
      error: (errorData) => {
        this.errorMessage=errorData
      },
      complete: () => {
        console.info("User Data2 ok");
        console.log(this.lista);
        
         this.cargarData();
        

      }
    })
  }

  saveData(): void{

    
    if (this.registerForm.valid)
      {  
          this.detallePedidos.amount= Number(this.registerForm.controls.cantidad.value!);
          this.detallePedidos.productId = this.prodId;
          
          let idtemp =   this.dataservice.getDatos(); 
          this.pedido.id= Number(idtemp);
          this.detallePedidos.pedido=this.pedido;
         
        this.json = JSON.stringify(  this.detallePedidos );
  
        console.log("json: "+this.json);
     
        this.pedidosservice.updateDetail(this.json, this.idDetalle).subscribe({
          next:() => {
            
            console.log("nombre: "+this.detallePedidos.amount);
            alert('Detalle Pedido Actualizado con Exito!');
            this.router.navigate(['listarproductos']);
          },
          error:(errorData)=> {
            console.error(errorData);
            alert(''+errorData);
            
          }

        });
      }
  }


  cargarData() {

    let cantidad = this.lista2['amount'];   
    this.registerForm.controls.cantidad.setValue(cantidad);   
 }


registerForm=this.formBuilder.group({
  id:[''],
  cantidad:['',Validators.required],

})

get cantidad()
{
  return this.registerForm.controls.cantidad;
}

}
