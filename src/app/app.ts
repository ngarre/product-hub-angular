import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Producto } from './producto/producto'; // Here we make TS recognise the symbol "Product"
import { ProductoModel } from './models/producto.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Producto], // making Angular can use product component in the app template
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('product-hub-angular');

  productoSeleccionado: ProductoModel = {
    id: 1,
    nombre: 'Microscopio',
    precio: 350
  };

  // With signal "productos" doesn't contain directly the array --> now it has a reactive container which contains the array
  // With readonly we will not reassign the value of the signal, but we can update its content (the array)
  readonly productos = signal<ProductoModel[]>([ 
    { id: 2, nombre: 'Centrífuga', precio: 2000 },
    { id: 3, nombre: 'Espectrofotómetro', precio: 3500 },
    { id: 4, nombre: 'Pipeta', precio: 200 },
  ]);



  eliminarProducto(id: number): void {
    // console.log('Producto a eliminar: ', id);
    // Updating array of products with those ones which button hasn't been clicked
    this.productos.update(productos => productos.filter(producto => producto.id !== id)); 
    // We access the array containing the "products" signal using the "update" method
  }
}
