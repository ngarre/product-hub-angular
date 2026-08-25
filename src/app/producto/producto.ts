import { Component, input, output } from '@angular/core';
import { ProductoModel } from '../models/producto.model'; // I don't need to add this in the "imports" inside "@Component": That imports of @Component is for things Angular needs 
// use in the template as another components, pipes, etc.  An interface actually doesn't exist when the app is running --> it only allows TS to check data types

@Component({
  selector: 'app-producto',
  imports: [],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Producto {
  producto = input.required<ProductoModel>();
  eliminado = output<number>();

  solicitarEliminacion(): void {
    this.eliminado.emit(this.producto().id);
  }
}
