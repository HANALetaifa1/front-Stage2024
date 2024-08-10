import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './../product.service'; 

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: [ './add-product.component.css']
  
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  message: string | null = null;
  

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      description: [''],
      stock: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });
  }
  ngOnInit(): void {
    this.addProduct();
  }
  

  async addProduct() {
    
    if (this.productForm.valid) {
      try {
        await this.productService.addProduct(this.productForm.value);
        this.message = 'Produit ajouté avec succès !';
        this.productForm.reset();
      } catch (error) {
        this.message = 'Erreur lors de l\'ajout du produit. Veuillez réessayer.';
      }
    } else {
      this.message = 'Veuillez remplir correctement tous les champs du formulaire.';
    }
    
  
  }
}
