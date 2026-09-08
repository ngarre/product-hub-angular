import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { ProductoModel } from '../models/producto.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-detalle-producto',
  imports: [RouterLink], // I need this import to navigate clicking in an element <a> in the template 
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.css',
})
export class DetalleProducto implements OnInit {
  ngOnInit(): void {
    this.buscarProductoDesdeApi();
  }

  // ActivatedRoute is a dependency of DetalleProducto because this component needs information about the route where it has been created
  private readonly route = inject(ActivatedRoute);
  private readonly productoService = inject(ProductoService);

  readonly productoDeApi = signal<ProductoModel | undefined>(undefined);

  readonly cargando = signal(false);
  readonly errorCarga = signal<string | null>(null);

  buscarProductoDesdeApi(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id === null) {
      return;
    }

    const idNumerico = Number(id);

    if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
      return;
    }

    this.cargando.set(true);
    this.errorCarga.set(null);

    const peticion = this.productoService.obtenerProductoApiPorId(idNumerico);

    peticion
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }))
      .subscribe({
        next: (productoModel: ProductoModel) => {
          this.productoDeApi.set(productoModel);
        },
        error: error => {
          console.error('Error al cargar el producto', error);
          this.errorCarga.set('No se ha podido recuperar el producto');
        }
      });
  }

}
