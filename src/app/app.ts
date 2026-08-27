import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioProducto } from './formulario-producto/formulario-producto';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormularioProducto], // making Angular can use product component in the app template
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('product-hub-angular');
}
