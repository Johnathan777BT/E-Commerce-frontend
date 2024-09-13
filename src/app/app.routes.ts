import { Routes } from '@angular/router';

import { ProductosComponent } from '../componentes/productos/productos.component';
import { ListarproductosComponent } from '../componentes/listarproductos/listarproductos.component';
import { PedidosComponent } from '../componentes/pedidos/pedidos.component';
import { DetallepedidosComponent } from '../componentes/detallepedidos/detallepedidos.component';
import { ListardetallepedidosComponent } from '../componentes/listardetallepedidos/listardetallepedidos.component';
import { UpdatedetallepedidosComponent } from '../componentes/updatedetallepedidos/updatedetallepedidos.component';


export const routes: Routes = [

    {path:'',redirectTo:'/inicio/0', pathMatch:'full'},
    {path:'inicio/:id',component:ProductosComponent}, //
    {path:'listarproductos',component:ListarproductosComponent},
    {path:'pedido', component:PedidosComponent},
    {path:'detalle/:id', component:DetallepedidosComponent},
    {path:'listardetallepedidos',component:ListardetallepedidosComponent},
    {path:'updatedetallepedidos/:id', component:UpdatedetallepedidosComponent},
    

];
