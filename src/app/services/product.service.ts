import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://localhost:44340/api/Products'; // Adjust as needed

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

   
  addProduct(product: any): Observable<any> {
    return this.http.post('https://localhost:44340/api/Products', product);
  }
  
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:44340/api/Products/categories');
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
  
    const token = localStorage.getItem('token'); // or sessionStorage
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.post(
      'https://localhost:44340/api/Upload/product-image',
      formData,
      { headers }
    );
  }
  
  getMerchantProducts(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.get<any[]>(
      'https://localhost:44340/api/User/merchant-products',
      { headers }
    );
  }

  
  
}
