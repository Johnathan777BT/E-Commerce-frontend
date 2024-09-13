import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterLink } from  '@angular/router';
import { ProductosService } from '../../servicios/productos.service';


@Component({
  selector: 'app-listarproductos',
  standalone: true,
  imports: [NgStyle, NgIf, NgFor, ReactiveFormsModule, RouterLink],
  templateUrl: './listarproductos.component.html',
  styleUrl: './listarproductos.component.scss'
})
export class ListarproductosComponent implements OnInit {

  
  nombre_campo:string="";
  json:String="";
  errorMessage:String="";
  lista: any[] = [];

  formulario = this.formBuilder.group({

    nombre: ['', Validators.required],

  });


  constructor(private formBuilder: FormBuilder, private router:Router, private productosservice:ProductosService){

  }

  
  
  ngOnInit(): void {
    if(this.nombre_campo==""){
        this.getListAll();
    }else{
      this.getListbyName(this.nombre_campo);
    }
    
  }


  enviarFormulario(): void {


    console.log("nombre:"+this.nombre_campo);


    if (this.formulario.valid) {
  
     this.nombre_campo  = this.formulario.controls.nombre.value!;
  
       console.log("nombre:"+this.nombre_campo);
      
       this.getListbyName(this.nombre_campo);

    } else {
  
      // Manejar caso de formulario inválido
  
    }
  
  }


  getListAll(): void{
    
    this.productosservice.getListAll().subscribe(
      (data) => {
     
      console.log(data);
      if(data.length==0 || !data){
        this.lista = [];
        
      }
      else {
        
        this.lista = data;      
      
      }

      },
      error => {
        console.log("error listando productos");
      // Aquí se debería tratar el error, bien mostrando un mensaje al usuario o de la forma que se desee.
      }
    );

  }

  getListbyName(nombre:string): void{
    
    this.productosservice.getListByName(nombre).subscribe(
      (data) => {
     
      console.log(data);
      if(data.length==0 || !data){
        this.lista = [];
        
      }
      else {
        
        this.lista = data;      
      
      }

      },
      error => {
        console.log("error listando productos");
      // Aquí se debería tratar el error, bien mostrando un mensaje al usuario o de la forma que se desee.
      }
    );

  }



}
