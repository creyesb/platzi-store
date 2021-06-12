import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { Product } from './../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  constructor(private productsService: ProductsService) {}
  products: Product[] = [];
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'price',
    'actions'
  ];
  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productsService.getAllProducts().subscribe(products => {
      console.log(products);
      this.products = products;
    });
  }
  deleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe(deleted => {
      if (deleted) {
        console.log(`Producto ${id} eliminado`);
        this.products = this.products.filter(product => product.id !== id);
      } else {
        console.log('Mo se puede eliminar');
      }
    });
  }
  updateProduct(id: string) {
    const updatedProduct: Partial<Product> = {
      description: 'Es un sticker'
    };
    this.productsService
      .updateProduct(id, updatedProduct)
      .subscribe(product => {
        console.log(product);
      });
  }
}
