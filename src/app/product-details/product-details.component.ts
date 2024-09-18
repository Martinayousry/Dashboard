import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormControl,ReactiveFormsModule,FormGroup,Validators } from '@angular/forms';

import { SpinnerComponent } from '../spinner/spinner.component';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe,DatePipe,ReactiveFormsModule,SpinnerComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  subscription: any;
  id: string = '';
  imgDomain: string = '';
  product: any = {};
  reviewError: string = '';
  selectedImage: string | null = null;
  loading: boolean = true;
  reviewForm = new FormGroup({
    comment: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    rating: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)])
  })
  constructor(private _ActivatedRoute: ActivatedRoute,
        private _ProductsService: ProductsService) { }

        loadProduct() {
              this.subscription = this._ProductsService.getProduct(this.id).subscribe((res) => {
                this.product = res.data
                this.loading = false;
              })
            }

  selectImage(image: string): void {
    this.selectedImage = this.imgDomain + image;
  }

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['id']
    this.imgDomain = this._ProductsService.productsImages;
    this.loadProduct()

  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }
}
