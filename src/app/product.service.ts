import{Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './add-product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7288/api/Product'; 
  

  constructor(private httpClient: HttpClient ) { }

  addProduct(product: any): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: Product): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/${id}`, product);
  }

getProduct(id: string): Observable<Product> {
  return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
}

deleteProduct(id: string): Observable<void> {
  return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
}

}

