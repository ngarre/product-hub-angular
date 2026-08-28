import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { ProductoModel } from '../models/producto.model';

@Component({
  selector: 'app-detalle-producto',
  imports: [RouterLink], // I need this import to navigate clicking in an element <a> in the template 
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.css',
})
export class DetalleProducto {
  // ActivatedRoute is a dependency of DetalleProducto because this component needs information about the route where it has been created
  private readonly route = inject(ActivatedRoute);
  private readonly productoService = inject(ProductoService);
  readonly producto = this.buscarProducto();

  buscarProducto(): ProductoModel | undefined {
    const id = this.route.snapshot.paramMap.get('id'); // it can be null or a string

    // If i don't even have an ID, I don't have a product to return either.
    // When the find method in ProductoService doesn't find a product with the given ID, it returns "undefined"
    // what we are doing here is ensuring that "undefined" is returned whenever we are unable to retrieve a product
    if (id === null) { 
      return undefined;
    }

    const idNumerico = Number(id);

    return this.productoService.buscarProductoPorId(idNumerico); // it can be "undefined" or "ProductoModel"
  }
}
