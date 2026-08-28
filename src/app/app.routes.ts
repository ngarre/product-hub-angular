import { Routes } from '@angular/router';
import { ListaProductos } from './lista-productos/lista-productos';
import { FormularioProducto } from './formulario-producto/formulario-producto';
import { DetalleProducto } from './detalle-producto/detalle-producto';

export const routes: Routes = [
    {
        path: '', // When the URL is empty...
        redirectTo: 'productos', // ... redirect to "http://localhost:4200/productos" 
        pathMatch: 'full' // Only if the URL is exactly: http://localhost:4200/  --> Do not accept partial matches
    },
    {
        path: 'productos',
        component: ListaProductos
    },
    {
        path: 'nuevo-producto',
        component: FormularioProducto
    },
    {
        path: 'productos/:id',
        component: DetalleProducto
    },
    {
        path: '**', // For any path which doesn't match with any of the previous ones --> this code must be at the end of the list of routes
        redirectTo: 'productos'
    }
];
