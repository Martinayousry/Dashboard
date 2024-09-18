import { Component, OnInit } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { MenubarComponent } from "../menubar/menubar.component";
import { OrdersService } from '../services/orders.service';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, MenubarComponent,CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  orders: any[] = [];
  categories: any[] = [];
  products: any[] = [];

  constructor(
    private ordersService: OrdersService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadCategories();
    this.loadProducts();
  }

  loadOrders(): void {
    this.ordersService.getOrders(5, 1, '-createdAt', '')
      .subscribe(response => {
        this.orders = response.orders;
      });
  }

  loadCategories(): void {
    this.categoriesService.getCategories(5, 1, '-createdAt', '')
      .subscribe(response => {
        this.categories = response.categories;
      });
  }

  loadProducts(): void {
    this.productsService.getAllProducts(5, 1, '-createdAt', '')
      .subscribe(response => {
        this.products = response.products;
      });
  }
}
