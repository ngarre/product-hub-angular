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

  eliminarProducto(id: number): void {
    console.log('Producto a eliminar: ', id);
  }
}
