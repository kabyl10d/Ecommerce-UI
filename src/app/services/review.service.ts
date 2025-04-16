import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) { }

  getReviewsByProduct(prodId: string): Observable<any[]> 
  {
    return this.http.get<any[]>(`https://localhost:44340/api/Review?prodId=${prodId}`);
  }
  
}
