// update-product.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from './../add-product/product.model';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  productForm: FormGroup;
  productId!: string; 
  message: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      id: [{ value: '', disabled: true }], // Champ ID en lecture seule
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      description: [''],
      stock: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.getProductById(this.productId);
  }

  getProductById(id: string): void {
    this.productService.getProduct(id).subscribe(
      (product: Product) => {
        this.productForm.patchValue(product);
      },
      (error: any) => {
        this.message = 'Erreur lors de la récupération du produit';
      }
    );
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productId = this.productForm.get('id')?.value;
      this.productService.updateProduct(productId, this.productForm.value).subscribe(
        () => {
          this.message = 'Produit modifié avec succès!';
          this.router.navigate(['/products']);
        },
        (error: any) => {
          this.message = 'Erreur lors de la modification du produit';
        }
      );
    }
  }

  goBack(): void {
    window.history.back();
  }
}
