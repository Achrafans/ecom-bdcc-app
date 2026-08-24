import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Products } from './ui/products/products';
import { Customers } from './ui/customers/customers';
import { adminGuard, userGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'products', component: Products, canActivate: [adminGuard] },
  { path: 'customers', component: Customers, canActivate: [userGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
