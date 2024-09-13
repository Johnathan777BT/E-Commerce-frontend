import { Component, OnInit } from '@angular/core';
import { FormBuilder,  ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ProductosService } from '../../servicios/productos.service';
import { Productos } from './productos';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [NgStyle, NgClass, NgIf, NgFor, ReactiveFormsModule, MatDatepickerModule, MatInputModule, MatNativeDateModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss',
  providers: [
    DatePipe,
  ]
})
export class ProductosComponent implements OnInit {


  errorMessage:String="";
  json:String="";
  productos:Productos = new Productos();
  idCli:number=0;
  lista: any=[];
  formData = new FormData();
  url:string = "";

  registerForm=this.formBuilder.group({
    id:[''],
    descripcion:['',Validators.required],
    nombre:['', Validators.required],
    precio:['',Validators.required],
    estado:['',Validators.required],
   
    file:['', Validators.required]
  })
  fileToUpload: File | undefined;

  validateFormat(event:any) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]/;
     if (!regex.test(key)) {
      event.returnValue = false;
       if (event.preventDefault) {
        event.preventDefault();
       }
     }
    }

  constructor(private datePipe: DatePipe, private formBuilder:FormBuilder, private router:Router, private activateRoute: ActivatedRoute, private productosservice:ProductosService){
    this.idCli = activateRoute.snapshot.params['id'];  
  }

  ngOnInit(): void {

    console.log("entro");
    this.registerForm.controls.descripcion.setValue("");
    
    this.registerForm.controls.nombre.setValue("");
    this.registerForm.controls.precio.setValue("");
    this.registerForm.controls.id.setValue("0");
  
     if(this.idCli!=0){
      this.productosservice.getListById(this.idCli).subscribe({
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
        
         this.cargarData();
      }
    })
  }
  }


  get file(){
      return this.registerForm.controls.file;
  }


  get nombre()
  {
    return this.registerForm.controls.nombre;
  }

  get descripcion()
  {
    return this.registerForm.controls.descripcion;
  }

  
   get precio(){
    return this.registerForm.controls.precio;
   }

   get estado(){

        return this.registerForm.controls.estado;
   }

   

   upload(event: any) {
    this.fileToUpload = event.target.files[0];
      console.log("im0"+this.fileToUpload?.name);
      const formData_ = new FormData();
      formData_.append('file',  this.fileToUpload!);

      this.productosservice.upload(formData_).subscribe(
        response=> {
            console.log("response:"+response);
            this.url= response['url'];
            console.log("response:"+this.url);
        }
      );

  }
  

   saveData() {

    if (this.registerForm.valid)
      {  
          this.productos.description= this.registerForm.controls.descripcion.value!;
          this.productos.name= this.registerForm.controls.nombre.value!
          this.productos.price= Number(this.registerForm.controls.precio.value!);
          this.productos.status = this.registerForm.controls.estado.value!;
          this.productos.url = this.url;

          
        this.json = JSON.stringify(  this.productos );
  
        console.log("json: "+this.json);
     
        if(this.idCli==0){


          const file_ = this.registerForm.controls.file.value!;
          const nombreimg = this.fileToUpload?.name;
          console.log("img: "+file_);
          //if(file_){

            this.productosservice.create(this.json).subscribe({
              next:() => {
              
                console.log("nombre recibido: "+this.productos.name);
      
            alert('Producto Insertado con Exito!');
            this.router.navigate(['listarproductos']);
              },
              error:(errorData)=> {
                console.error(errorData);
                alert(''+errorData);
              }
            })

         // }else{
         //   console.log("error no hay imagen");
        //  }

       
      }else{

        let id= this.registerForm.controls.id.value!;
        this.productosservice.update(this.json, Number(id)).subscribe({
          next:() => {
            
            console.log("nombre: "+this.productos.name);
            alert('Producto Actualizado con Exito!');
            this.router.navigate(['listarproductos']);
          },
          error:(errorData)=> {
            console.error(errorData);
            alert(''+errorData);
            
          }

        })
      
      }
      
      }


   }


   
   cargarData() {

    
     
    let id_prod =this.lista['id'];
    let descripcion= this.lista['description'];
    let nombre = this.lista['name'];
    let precio = this.lista['price'];
    let status = this.lista['status'];
   
    let url = this.lista['url'];
    
    this.url= url;
    this.registerForm.controls.nombre.setValue(nombre);
    this.registerForm.controls.descripcion.setValue(descripcion);
    this.registerForm.controls.estado.setValue(status);
    this.registerForm.controls.id.setValue(id_prod);

    this.registerForm.controls.precio.setValue(precio);

    this.registerForm.get('file')!.clearValidators();   
    this.registerForm.get('file')!.updateValueAndValidity();
    
 }


}
