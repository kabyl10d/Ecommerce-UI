import { Component, OnInit, Input } from '@angular/core'; 
import { ReviewService } from '../../services/review.service';

@Component({ 
  selector: 'app-product-reviews', 
  templateUrl: './product-reviews.component.html', 
  styleUrls: ['./product-reviews.component.scss']
}) 


export class ProductReviewsComponent implements OnInit 
{ 
  @Input() 
  productId!: string; 
  reviews: any[] = [];

constructor(private reviewService: ReviewService) {}


ngOnInit(): void 
{ 
  if (this.productId) 
    { 
      this.reviewService.getReviewsByProduct(this.productId).subscribe({ 
        next: (res) => this.reviews = res, 
        error: (err) => console.error('Failed to fetch reviews:', err) }); 
      } 
    } 
  }