import {  Component, ChangeDetectorRef,OnDestroy, OnInit, inject } from '@angular/core';
import { MediaMatcher } from "@angular/cdk/layout";
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule  } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from '../../app/app.component';
import { NgIf, NgForOf, NgStyle } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DataserviceService } from '../../servicios/dataservice.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [ RouterOutlet,   MatSidenavModule,MatMenuModule, MatToolbarModule, MatListModule, MatIconModule, MatButtonModule, AppComponent,
     NgStyle, NgIf, NgForOf, RouterLink, RouterOutlet ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
 
})
export class SidenavComponent  implements OnDestroy, OnInit{

  mobileQuery: MediaQueryList;
  id:String="Id Pedido:";
 
  private dataService = inject(DataserviceService);


  getDatos(){
    return this.dataService.getDatos();
  }

  
  fillerNav =[
    {    name:"Productos", route:"inicio/0", icon:"home"},
    {    name:"Listar Productos", route:"listarproductos", icon:"perm_contact_calendar"},
    {    name:"Pedido", route:"pedido", icon:"assignment"},
    {    name:"Detalle Pedido", route:"listardetallepedidos", icon:"add_shopping_cart"}
    

]


fillerContent = Array.from(
  { length: 50 },
  () =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
     labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
     laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
     voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
     cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
);

private _mobileQueryListener: () => void;

constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {

 
  this.mobileQuery = media.matchMedia("(max-width: 600px)");
  this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  // this.mobileQuery.addListener(this._mobileQueryListener);
  this.mobileQuery.addListener( this._mobileQueryListener);

}
  ngOnInit(): void {

 
    console.log("datos desde service: "+this.getDatos());


  
  }

ngOnDestroy(): void {
  this.mobileQuery.removeListener( this._mobileQueryListener);
}

shouldRun = true;

}
