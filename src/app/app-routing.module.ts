import { InscriptionComponent } from './inscription/inscription.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspaceAdminComponent } from './espace-admin/espace-admin.component';
import { PageComponent } from './page/page.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  { path: 'Acceuil', component: PageComponent },
  { path: 'profile', component: EspaceAdminComponent },
  { path: 'addproduct', component:AddProductComponent },
  { path: 'updateproduct', component:UpdateProductComponent },
  { path: 'deleteproduct', component: DeleteProductComponent },
  { path: 'auth', component: AuthentificationComponent },
  { path: 'inscri', component: InscriptionComponent },
  { path: 'mdpass', component: ForgetPasswordComponent },





  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
