import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulario-producto',
  imports: [ReactiveFormsModule], // we need this import for connect our FormControl with an "<input>" in the template
  templateUrl: './formulario-producto.html',
  styleUrl: './formulario-producto.css',
})

export class FormularioProducto {

  private readonly productoService = inject(ProductoService);
  private readonly route = inject(Router);

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

    // making the code more robust so it doesn't rely solely on the disabled submit button
    if (this.formularioProducto.invalid) {
      return;
    }

    // getRawValue() guarantees all form controls are included (without it TS thinks a disabled control could return undefined).
    // With nonNullable controls, nombre is string and precio is number.

    const valores = this.formularioProducto.getRawValue();

    this.productoService.agregarProducto(
      valores.nombre,
      valores.precio
    );

    // Or with destructuring:
    // const { nombre, precio } = this.formularioProducto.getRawValue();
    // this.productoService.agregarProducto(nombre, precio);

    this.formularioProducto.reset(); // Cleans the form resetting it to its default values

    this.route.navigate(['/productos']);
  }
}
