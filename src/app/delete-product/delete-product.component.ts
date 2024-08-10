import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../add-product/product.model';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  productId: number = 0;  
  product: Product | null = null;
  message: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.productId = Number(idParam);
      await this.getProductById(this.productId);
    }
  }

  async getProductById(id: number): Promise<void> {
    try {
      const product = await this.productService.getProduct(id.toString()).toPromise();
      this.product = product || null;  
    } catch (error) {
      this.message = 'Erreur lors de la récupération du produit';
      this.product = null;  
    }
  }

  async deleteProduct(): Promise<void> {
    try {
      await this.productService.deleteProduct(this.productId.toString()).toPromise();
      this.message = 'Produit supprimé avec succès!';
      this.router.navigate(['/products']);
    } catch (error) {
      this.message = 'Erreur lors de la suppression du produit';
    }
  }

  goBack(): void {
    window.history.back();
  }
}
