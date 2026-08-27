import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-formulario-producto',
  imports: [ReactiveFormsModule], // we need this import for connect our FormControl with an "<input>" in the template
  templateUrl: './formulario-producto.html',
  styleUrl: './formulario-producto.css',
})

export class FormularioProducto {

  private readonly productoService = inject(ProductoService);

  // nombreProducto = new FormControl('');
  // precioProducto = new FormControl(0); // it creates control with initial value in 0

  // Independent controls become part of the same object FormGroup:
  formularioProducto = new FormGroup({
    nombre: new FormControl('', { nonNullable: true }),
    precio: new FormControl(0, { nonNullable: true })
  })

  agregarProducto(): void {
    // getRawValue() guarantees all form controls are included (without it TS thinks a disabled control could return undefined).
    // With nonNullable controls, nombre is string and precio is number.

    const valores = this.formularioProducto.getRawValue();

    // Or with destructuring:
    // const { nombre, precio } = this.formularioProducto.getRawValue();
    // this.productoService.agregarProducto(nombre, precio);

    this.productoService.agregarProducto(
      valores.nombre,
      valores.precio
    );
  }
}
