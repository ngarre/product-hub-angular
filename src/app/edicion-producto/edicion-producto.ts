import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { finalize } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-edicion-producto',
  imports: [ReactiveFormsModule],
  templateUrl: './edicion-producto.html',
  styleUrl: './edicion-producto.css',
})
export class EdicionProducto implements OnInit {

  ngOnInit(): void {
    this.recuperarProductoApiPorId();
  }

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productoService = inject(ProductoService);

  readonly recuperandoProducto = signal(false);
  readonly errorRecuperacion = signal<string | null>(null);

  private idProducto: number | null = null;

  readonly actualizandoProducto = signal(false);
  readonly errorActualizacion = signal<string | null>(null);

  formularioEdicion = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    precio: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(0.01)
      ],
    })
  })

  recuperarProductoApiPorId(): void {
    this.recuperandoProducto.set(true);
    this.errorRecuperacion.set(null);

    const id = this.route.snapshot.paramMap.get('id');

    if (id === null) {
      this.errorRecuperacion.set('No se encontró el id del producto');
      this.recuperandoProducto.set(false);
      return;
    }

    const idNumerico = Number(id);
    this.idProducto = idNumerico;

    const peticion = this.productoService.obtenerProductoApiPorId(idNumerico);

    peticion
      .pipe(
        finalize(() => {
          this.recuperandoProducto.set(false);
        },
        )
      )
      .subscribe({
        next: (productoModel) => {
          this.formularioEdicion.setValue({
            nombre: productoModel.nombre,
            precio: productoModel.precio
          });
        },

        error: error => {
          console.error('Error al recuperar el producto:', error);
          this.errorRecuperacion.set('No se pudo cargar el producto a editar');
        }
      });
  }

  guardarCambios(): void {
    this.errorActualizacion.set(null);

    if (this.formularioEdicion.invalid) {
      this.errorActualizacion.set('Revisa los datos del formulario'); 
      return;
    }

    if (this.idProducto === null) {
      this.errorActualizacion.set('No se pudo identificar el producto');
      return;
    }

    this.actualizandoProducto.set(true);

    const { nombre, precio } = this.formularioEdicion.getRawValue();

    const peticion = this.productoService.actualizarProductoApi(this.idProducto, nombre, precio);

    peticion
      .pipe(finalize(() => {
        this.actualizandoProducto.set(false);
      }))
      .subscribe({
        next: productoModel => {
          console.log('Producto actaulizado:', productoModel);

          this.formularioEdicion.reset();
          this.router.navigate(['/productos']);
        },
        error: error => {
          console.log('Error al actualizar el produto', error);
          this.errorActualizacion.set('No se pudo actualizar el producto')
        }
      })
  }
}


