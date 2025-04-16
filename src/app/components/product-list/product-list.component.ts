import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  constructor(private productService: ProductService, private http: HttpClient, private reviewService: ReviewService) {}
   
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Product list:', this.products);
        this.products.forEach(product => {
          this.getReviews(product.productId, product);
        });
      },
      error: (err) => console.error('Error fetching products', err)
    });
  }

   
  getCategoryName(id: number): string {
    const categories: { [key: number]: string } = {
      1: 'Electronics',
      2: 'Mobiles',
      3: 'Home & Kitchen',
      4: 'Fashion',
      5: 'Beauty',
      6: 'Health',
      7: 'Baby Products',
      8: 'Stationery'
    };
    return categories[id] || 'Unknown';
  }
  
  deleteProduct(id: string): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  
    this.http.delete<{ success: boolean; message: string }>(
      `https://localhost:44340/api/Products/${id}`,
      { headers }
    ).subscribe({
      next: (res) => {
        if (res.success) {
          this.products = this.products.filter(p => p.productId !== id);
          console.log(res.message);
        }
      },
      error: (err) => console.error('Delete failed', err)
    });
  }
  
    
  editingProduct: any = null;

  editProduct(product: any): void {
    this.editingProduct = { ...product }; // clone to prevent live edit
  }
  
  updateProduct(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    this.http.put(
      `https://localhost:44340/api/Products/${this.editingProduct.productId}`,
      this.editingProduct,
      { headers }
    ).subscribe({
      next: () => {
        const index = this.products.findIndex(p => p.productId === this.editingProduct.productId);
        this.products[index] = { ...this.editingProduct }; // update local view
        this.editingProduct = null;
      },
      error: (err) => console.error('Update failed', err)
    });
  }

  getReviews(prodId: string, product: any) {
    this.reviewService.getReviewsByProduct(prodId).subscribe({
      next: (res) => {
        product.reviews = res;
      },
      error: (err) => {
        console.error('Failed to fetch reviews:', err);
      }
    });
  }

  getAverageRating(reviews: any[]): number {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.reviewType, 0);
    return +(total / reviews.length).toFixed(1); // 1 decimal
  }
  
  getReviewLabel(reviewType: number): string {
  switch (reviewType) {
    case 0: return '⭐ Poor';
    case 1: return '⭐⭐ Fair';
    case 2: return '⭐⭐⭐ Good';
    case 3: return '⭐⭐⭐⭐ Very Good';
    case 4: return '⭐⭐⭐⭐⭐ Excellent';
    default: return 'Unrated';
  }
}

  
  
}
