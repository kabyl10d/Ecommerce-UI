import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  reviews: any[] = [];
  averageRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.loadProduct(productId);
        this.loadReviews(productId);
      }
    });
  }

  loadProduct(id: string): void {
    this.productService.getById(Number(id)).subscribe(prod => {
      this.product = prod;
    });
  }

  loadReviews(id: string): void {
    this.reviewService.getReviewsByProduct(id).subscribe(reviews => {
      this.reviews = reviews;
      this.averageRating = this.calculateAverageRating(reviews);
    });
  }

  calculateAverageRating(reviews: any[]): number {
    if (!reviews || reviews.length === 0) return 0;
    const values = reviews.map(r => r.reviewType); // enum numeric value
    const total = values.reduce((sum, r) => sum + r, 0);
    return Number((total / reviews.length).toFixed(1));
  }
}