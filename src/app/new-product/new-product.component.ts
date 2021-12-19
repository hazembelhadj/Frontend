import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../services/catalogue.service";
import {Router} from "@angular/router";
import {Product} from "../model/Product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  public currentProduct: any;
  public mode: number=1;

  constructor(private catService:CatalogueService , private router:Router) { }

  ngOnInit(): void {
  }

  onSaveProduct(data:any) {
    this.catService.saveResource(this.catService.host+"/produits",data )
      .subscribe(res=> {
       // this.router.navigateByUrl("products");
        this.currentProduct=res;
        this.mode=2;


      })
  }

  onNewProduct() {
    this.mode=1;
  }
}
