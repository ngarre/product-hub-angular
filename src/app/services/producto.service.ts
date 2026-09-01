import { computed, Injectable, signal, inject } from '@angular/core';
import { ProductoModel } from '../models/producto.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface ProductoApi {
  id: number;
  title: string;
  price: number;
}

@Injectable({ // Inyectable says Angular this class can participate in its inyecting dependency system
  providedIn: 'root', // Allows Angular to provide a shared instance of the service in all the application
})
export class ProductoService {

  private readonly http = inject(HttpClient);

  private siguienteId = 5;

  // It is private because only ProductoService needs to know this initial list
  private readonly productosIniciales: ProductoModel[] = [
    { id: 2, nombre: 'Centrífuga', precio: 2000 },
    { id: 3, nombre: 'Espectrofotómetro', precio: 3500 },
    { id: 4, nombre: 'Pipeta', precio: 200 },
  ]

  // With signal "productos" doesn't contain directly the array --> now it has a reactive container which contains the array
  // readonly avoid reassign the property productos to another signal, but the value contained in the signal can change with set() or update()
  readonly productos = signal<ProductoModel[]>([
    ...this.productosIniciales
  ]);

  // property numeroProductos is readonly because it can't be reassigned to another signal --> computed internally uses ComputedSignal<number>
  readonly numeroProductos = computed(() => this.productos().length);


  cargarProductosApi(): Observable<ProductoModel[]> {
    return this.http.get<ProductoApi[]>('https://fakestoreapi.com/products') // "peticion" isn't an array: it is an "Observable<ProductoApi[]"
      .pipe(
        map((productosApi: ProductoApi[]): ProductoModel[] => { // "productosApi" is the array emitted by the Observable when the response arrives
          return productosApi.map((productoApi: ProductoApi) => {
            return {
              id: productoApi.id,
              nombre: productoApi.title,
              precio: productoApi.price
            };
          });
        }))
  }

  eliminarProducto(id: number): void {
    // console.log('Producto a eliminar: ', id);
    // Updating array of products with those ones which button hasn't been clicked
    this.productos.update(productos => productos.filter(producto => producto.id !== id));
    // We access the array containing the "products" signal using the "update" method
  }

  agregarProducto(nombre: string, precio: number): void {
    const nuevoId: number = this.siguienteId;
    // When property and variable have the same name we don't need to write the 
    // extended form: "{ id: this.siguienteId, nombre: nombre, precio: precio }"
    const nuevoProducto: ProductoModel = { id: nuevoId, nombre, precio };

    this.siguienteId++;

    this.productos.update(productos =>
      [...productos,
        nuevoProducto]
    )
  }

  restablecerProductos(): void {
    this.productos.set([
      ...this.productosIniciales
    ]);
  }

  buscarProductoPorId(id: number): ProductoModel | undefined {
    return this.productos().find(producto => producto.id === id);
  }

  actualizarProductos(productos: ProductoModel[]): void {
    this.productos.set(productos); // Updates the signal "productos"
  }
}
