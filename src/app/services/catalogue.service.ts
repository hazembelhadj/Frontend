import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/Product.model";

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host: String = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {
  }

  public getProductsbyKeyword(mc: string, page: number, size: number) {
    return this.httpClient.get(this.host + "/produits/search/byDesignationPage?mc=" + mc + "&page=" + page + "&size=" + size);
  }

  public getProducts(page: number, size: number) {
    return this.httpClient.get(this.host + "/produits?page=+" + page + "&size=" + size);
  }

  public deleteResource(url: any) {
    return this.httpClient.delete(url);
  }

  public saveResource(url: any, data: any): Observable<any> {
    return this.httpClient.post(url, data);
  }

  public getResource(url: any): Observable<any> {
    return this.httpClient.get(url);
  }

  public UpdateResource(url: any, data: any): Observable<any> {
    return this.httpClient.put(url, data);
  }
}
