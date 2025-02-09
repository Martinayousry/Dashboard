import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { rolesGuard } from './guards/roles.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', title: 'login', component: LoginComponent },
  { path: 'home', title: 'Home', canActivate: [authGuard], loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  {
    path: 'categories', canActivate: [authGuard],
    children: [
      { path: '', title: 'All Categories', loadComponent: () => import('./categories/categories.component').then(m => m.CategoriesComponent), },
      { path: 'create', title: 'create Category', loadComponent: () => import('./add-category/add-category.component').then(m => m.AddCategoryComponent) },
      { path: ':id/update', title: 'update Category', loadComponent: () => import('./update-category/update-category.component').then(m => m.UpdateCategoryComponent) }
    ]
  },
  {
    path: 'subcategories', canActivate: [authGuard],
    children: [
      { path: '', title: 'All Subcategories', loadComponent: () => import('./subcategories/subcategories.component').then(m => m.SubcategoriesComponent) },
      { path: 'create', title: 'create Subcategory', loadComponent: () => import('./add-subcategory/add-subcategory.component').then(m => m.AddSubcategoryComponent) },
      { path: ':id/update', title: 'update Subcategory', loadComponent: () => import('./update-subcategory/update-subcategory.component').then(m => m.UpdateSubcategoryComponent) }
    ]
  },
  {
    path: 'products', canActivate: [authGuard],
    children: [
      { path: '', title: 'Products', loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
      { path: 'create', title: 'Create Product', loadComponent: () => import('./add-product/add-product.component').then(m => m.AddProductComponent) },
      { path: ':id/update', title: 'Update Product', loadComponent: () => import('./update-product/update-product.component').then(m => m.UpdateProductComponent) },
      { path: ':id', title: 'Product Details', loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent) }  // New route for product details
    ]
  },

  {
    path: 'coupons', canActivate: [authGuard],
    children: [
      { path: '', title: 'coupons', loadComponent: () => import('./coupons/coupons.component').then(m => m.CouponsComponent) },
      { path: 'create', title: 'create coupon', loadComponent: () => import('./add-coupon/add-coupon.component').then(m => m.AddCouponComponent) },
      { path: ':id/update', title: 'update coupon', loadComponent: () => import('./update-coupon/update-coupon.component').then(m => m.UpdateCouponComponent) }
    ]
  },

  {
    path: 'orders', canActivate: [authGuard],
    children: [
      { path: '', title: 'orders', loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent) },
    ]
  },
  // { path: 'users', title: 'Users', canActivate: [authGuard, rolesGuard], loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
  { path: 'forgetPassword', title: 'forget password', loadComponent: () => import('./forget-password/forget-password.component').then(m => m.ForgetPasswordComponent) },
  { path: '**', title: '404 Not Found', component: NotFoundComponent },

];
