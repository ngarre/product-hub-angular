import { Component, inject } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../producto/producto'; // Here we make TS recognise the symbol "Product"

@Component({
  selector: 'app-lista-productos',
  imports: [Producto],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductos {

  private readonly productoService = inject(ProductoService);

  // With the next two lines we point to the signals that live in ProductoService (same reference)
  //  --> in app.html we can continue using "productos()" and "numeroProductos()"
  readonly productos = this.productoService.productos;
  readonly numeroProductos = this.productoService.numeroProductos;

  // The next two lines allow the template to know the values of "cargando" and "errorCarga"
  readonly cargando = this.productoService.cargando;
  readonly errorCarga = this.productoService.errorCarga;

  eliminarProducto(id: number): void {
    this.productoService.eliminarProducto(id);
  }

  restablecerProductos(): void {
    this.productoService.restablecerProductos();
  }

  cargarDesdeApi(): void {
    this.productoService.cargarProductosApi();
  }
}
