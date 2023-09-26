import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product-interfaces";
import { ProductService } from './product.service';
import { Subscription } from "rxjs";

@Component({
   // selector: 'pm-products',
   templateUrl: './product-list.component.html',
   styleUrls: ['./product-list.component.css'],
   // providers: ['productService']
})

export class ProductListComponent implements OnInit, OnDestroy {

   pageTitle: string = 'Product List';
   imageWidth: number = 50;
   imageMargin: number = 2;
   showImage: boolean = false;
   errorMessage: string = '';
   sub!: Subscription;

   private _listFilter: string = "";
   get listFilter(): string {
      return this._listFilter;
   }
   set listFilter(value: string) {
      this._listFilter = value;
      console.log('is setter', this._listFilter);
      this.filteredProducts = this.performFilter(value)
   }

   filteredProducts: IProduct[] = [];

   products: IProduct[] = [];

   constructor(private productService: ProductService) { }

   performFilter(filterBy: string): IProduct[] {
      filterBy: filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) =>
         product.productName.toLocaleLowerCase().includes(filterBy));
   }
   toogleImage(): void {
      this.showImage = !this.showImage;
   }

   // hook method
   ngOnInit(): void {
      this.sub = this.productService.getProducts().subscribe({
         next: products => {
            this.products = products;
            this.filteredProducts = this.products;
         },
         error: err => this.errorMessage = err
      })

   }

   ngOnDestroy(): void {
      this.sub.unsubscribe()
   }

   onRatingClicked(message: string): void {
      this.pageTitle = ' Product List: ' + message;
   }
}