import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-producto',
  imports: [ReactiveFormsModule], // we need this import for connect our FormControl with an "<input>" in the template
  templateUrl: './formulario-producto.html',
  styleUrl: './formulario-producto.css',
})
export class FormularioProducto {
  nombreProducto = new FormControl('');
  precioProducto = new FormControl(0); // it creates control with initial value in 0
}
