import { Component, OnInit } from '@angular/core';

import { Product } from '@core/models/product.model';
import { ProductsService } from '@core/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.container.html',
  styleUrls: ['./products.container.scss']
})
export class ProductsContainer implements OnInit {
  products: Product[] = [];
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.fetchProducts();
    /* this.products = this.productsService.getAllProducts();
    console.log(this.products);*/
  }

  clickProduct(id: string) {
    console.log('product');
    console.log(id);
  }

  fetchProducts() {
    this.productsService.getAllProducts().subscribe(products => {
      console.log(products);
      this.products = products;
    });
  }
}
