import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogueService} from "../services/catalogue.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  currentProduct: any;
   url: any;

  constructor(private router:Router , private activatedRoute:ActivatedRoute,private catService:CatalogueService) { }

  ngOnInit(): void {
 this.url=atob(this.activatedRoute.snapshot.params.id);
    this.catService.getResource(this.url)
      .subscribe(data=>{
        this.currentProduct=data;
      })

  }

  onUpdateProduct(value:any) {
    this.catService.UpdateResource(this.url,value)
      .subscribe(data=>{
        alert("Mise a jour effectué avec succés");
        this.router.navigateByUrl("/products")
      })
  }
}
