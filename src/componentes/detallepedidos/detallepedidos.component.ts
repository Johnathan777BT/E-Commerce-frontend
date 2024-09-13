import { NgFor, NgIf, NgStyle, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router,RouterLink } from  '@angular/router';
import { ProductosService } from '../../servicios/productos.service';
import { Productos } from '../productos/productos';
import { DetallePedidos } from '../pedidos/detallepedidos';
import { Pedidos } from '../pedidos/pedidos';
import { PedidosService } from '../../servicios/pedidos.service';
import { DataserviceService } from '../../servicios/dataservice.service';


@Component({
  selector: 'app-detallepedidos',
  standalone: true,
  imports: [NgStyle, NgIf, NgFor, ReactiveFormsModule, RouterLink, CurrencyPipe],
  templateUrl: './detallepedidos.component.html',
  styleUrl: './detallepedidos.component.scss'
})
export class DetallepedidosComponent implements OnInit {

 id:number=0;
 productos:Productos = new Productos();
 pedido:Pedidos = new Pedidos();
 lista: any=[];
 errorMessage:string="";
 detallePedido:DetallePedidos=new DetallePedidos();
 json:string="";


 registerForm=this.formBuilder.group({
  id:[''],
  cantidad:['',Validators.required],

})

get cantidad()
{
  return this.registerForm.controls.cantidad;
}


  constructor( private dataService:DataserviceService, private router:Router, private activateRoute: ActivatedRoute, productosservice:ProductosService,private pedidosservice:PedidosService, private formBuilder:FormBuilder){
    this.id = activateRoute.snapshot.params['id'];  

    console.log("id:"+this.id);

   
      productosservice.getListById(this.id).subscribe({
      next: (userData2) => {
        this.productos=userData2;
        console.log("userData;"+userData2.nombre);      
       this.lista = userData2;
      },
      error: (errorData) => {
        this.errorMessage=errorData
      },
      complete: () => {
        console.info("User Data2 ok");
        console.log(this.lista);
        
         
      }
    })
  }


  ngOnInit(): void {
   


  }

  saveData(): void{

    if (this.registerForm.valid)
      {  
          this.detallePedido.amount= Number(this.registerForm.controls.cantidad.value!);
          this.detallePedido.productId = this.id;
          
          let idtemp =  this.dataService.getDatos(); 
         
          this.pedido.id= Number(idtemp);
          this.detallePedido.pedido=this.pedido;
         
        this.json = JSON.stringify(  this.detallePedido );
  
        console.log("json: "+this.json);
     
        
        if(idtemp[0]=="" || idtemp[0]=="0"){
                 alert("No existe un pedido en proceso");
        }else{       

        this.pedidosservice.createDetail(this.json).subscribe({
          next:() => {
            
            console.log("nombre: "+this.detallePedido.amount);
            alert('Detalle Pedido Agregado con Exito!');
            this.router.navigate(['listarproductos']);
          },
          error:(errorData)=> {
            console.error(errorData);
            alert(''+errorData);
            
          }

        });
      }




      }
    

  }

}
