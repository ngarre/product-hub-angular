import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-formulario-producto',
  imports: [ReactiveFormsModule], // we need this import for connect our FormControl with an "<input>" in the template
  templateUrl: './formulario-producto.html',
  styleUrl: './formulario-producto.css',
})

export class FormularioProducto {

  private readonly productoService = inject(ProductoService);
  private readonly route = inject(Router);
  readonly creando = signal(false);
  readonly errorCrear = signal<string | null>(null);

  // nombreProducto = new FormControl('');
  // precioProducto = new FormControl(0); // it creates control with initial value in 0

  // Independent controls become part of the same object FormGroup:
  formularioProducto = new FormGroup({
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

  agregarProducto(): void {
    this.creando.set(true);
    this.errorCrear.set(null);

    // making the code more robust so it doesn't rely solely on the disabled submit button
    if (this.formularioProducto.invalid) {
      return;
    }

    // getRawValue() guarantees all form controls are included (without it TS thinks a disabled control could return undefined).
    // With nonNullable controls, nombre is string and precio is number.

    const { nombre, precio } = this.formularioProducto.getRawValue();

    const peticion = this.productoService.crearProductoApi(nombre, precio);

    peticion
      .pipe(finalize(() => {
        this.creando.set(false);
      })
      )
      .subscribe({
        next: productoModelCreado => {
          console.log('Producto creado:', productoModelCreado);

          this.formularioProducto.reset();
          this.route.navigate(['/productos']);
        },

        error: error => {
          console.error('Error al crear producto:', error);
          this.errorCrear.set('No se pudo crear el producto');
        }
      });
  }
}
