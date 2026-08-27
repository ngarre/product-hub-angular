import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Producto } from './producto/producto'; // Here we make TS recognise the symbol "Product"
import { ProductoService } from './services/producto.service';
import { FormularioProducto } from './formulario-producto/formulario-producto';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Producto, FormularioProducto], // making Angular can use product component in the app template
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('product-hub-angular');

  // The next line asks Angular to provide us a new instance of ProductoService,
  // it is readonly because App will always preserve the same reference to the service --> we won't do "this.productoService = anotherService"
  private readonly productoService = inject(ProductoService);

  // With the next two lines we point to the signals that live in ProductoService (same reference) --> in app.html we can continue using "productos()" and "numeroProductos()"
  readonly productos = this.productoService.productos;
  readonly numeroProductos = this.productoService.numeroProductos;
 

  eliminarProducto(id: number): void {
    this.productoService.eliminarProducto(id);
  }

  restablecerProductos(): void{
    this.productoService.restablecerProductos();
  }
  
}
