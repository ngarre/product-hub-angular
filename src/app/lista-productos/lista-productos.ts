import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../producto/producto'; // Here we make TS recognise the symbol "Product"
import { finalize } from 'rxjs';

@Component({
  selector: 'app-lista-productos',
  imports: [Producto],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductos implements OnInit {

  // ngOnInit is a lifecycle method that Angular calls when it initializes the component.
  // Implementing OnInit helps TS verify that we are correctly implementing that contract.
  ngOnInit(): void {
    this.cargarDesdeApi();
  }

  readonly cargando = signal(false); // TS can infer the type from the initial value, so I don't need to write <boolean>
  readonly errorCarga = signal<string | null>(null);

  readonly eliminando = signal(false);
  readonly errorEliminar = signal<string | null>(null);

  private readonly productoService = inject(ProductoService);

  // With the next two lines we point to the signals that live in ProductoService (same reference)
  //  --> in app.html we can continue using "productos()" and "numeroProductos()"
  readonly productos = this.productoService.productos;
  readonly numeroProductos = this.productoService.numeroProductos;

  eliminarProducto(id: number): void {
    this.productoService.eliminarProducto(id);
  }

  eliminarProductoDesdeApi(id: number): void {
    this.eliminando.set(true);
    this.errorEliminar.set(null);

    const peticion = this.productoService.eliminarProductoApi(id);

    peticion
      .pipe(
        finalize(() => {
          this.eliminando.set(false);
        }))
      .subscribe({
        // This works via scope/closure: the "next" function "remembers" the environment
        // where it was created and can access the id from the outer method.
        // The value passed as parameter to the "next" function must be the value emitted by
        // the Observable, and our "Observable<void> is not emitting an ID"
        next: () => {this.productoService.eliminarProducto(id)},

        error: error => {
          console.error('Error al eliminar producto:', error);
          this.errorEliminar.set('No se pudo eliminar el producto');
        }
      });
  }

  restablecerProductos(): void {
    this.productoService.restablecerProductos();
  }

  cargarDesdeApi(): void {
    this.cargando.set(true);
    this.errorCarga.set(null); // To clean any old errors

    const peticion = this.productoService.cargarProductosApi();

    peticion
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }))
      .subscribe({
        next: productosConvertidos => {
          this.productoService.actualizarProductos(productosConvertidos);
        },

        error: error => {
          console.error('Error al cargar productos:', error);
          this.errorCarga.set('No se pudieron cargar los productos');
        }
      });
  }
}
