import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CatalogueService} from "../services/catalogue.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

public produits: any;
public size:number=5;
public currentPage:number=0;
public totalPages : number | undefined;
public pages: Array<number> | undefined;
  private currentKeyword: String="";
  constructor(private catService:CatalogueService, private router:Router) { }

  ngOnInit(): void {
  }

  onGetProducts() {
    this.catService.getProducts(this.currentPage,this.size)

      .subscribe(data=> {
        this.produits = data;
        this.totalPages=(data as any).page.totalPages;
        if (this.totalPages != null) {
          this.pages = new Array<number>(this.totalPages);
        }
      },err => {
        console.log(err);

      });

  }

  onPagProduct(i:number) {
    this.currentPage=i;
    this.onChercher({keyword:this.currentKeyword});

  }

  onChercher(form: any) {
    this.currentKeyword=form.keyword;
    this.catService.getProductsbyKeyword(form.keyword,this.currentPage,this.size)

      .subscribe(data=> {
        this.produits = data;
        this.totalPages=(data as any).page.totalPages;
        if (this.totalPages != null) {
          this.pages = new Array<number>(this.totalPages);
        }
      },err => {
        console.log(err);

      });
  }

  onDeleteProduct(p:any) {
    let conf=confirm("Etes vous sure?");
    if(conf){
      this.catService.deleteResource(p._links.self.href)
        .subscribe(data=>{
          this.onGetProducts();

        })
    }


  }

  onEditProduct(p:any) {
    let url=p._links.self.href;

    this.router.navigateByUrl("/edit-product/"+btoa(url));

  }
}
