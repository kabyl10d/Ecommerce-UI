import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-merchant-products',
  templateUrl: './merchant-products.component.html',
  styleUrls: ['./merchant-products.component.scss']
})
export class MerchantProductsComponent {
  products: any[] = [];

  constructor(private productService: ProductService, private http: HttpClient) {}
  
  ngOnInit(): void {
    this.productService.getMerchantProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Merchant product fetch error', err)
    });
  }
  deleteProduct(id: string): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  
    this.http.delete(`https://localhost:44340/api/Products/${id}`, { headers })
      .subscribe({
        next: () => {
          this.products = this.products.filter(p => p.productId !== id);
          console.log('Product deleted');
        },
        error: (err) => console.error('Delete failed', err)
      });
  }
  
  editProduct(product: any): void {
    // Redirect to edit form or populate modal
    // I can help set this up too if needed
  }
  
}
