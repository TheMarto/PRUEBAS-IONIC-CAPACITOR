
import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  //obteermos procut list by category id
  getProductByCategory(idCategory){
    return CapacitorHttp.get({
      url: environment.urlApi + 'products/category/'+ idCategory,
      params: {},
      headers: {
        'content-tytpe': 'apliocation/json'
      }
    }).then((response: HttpResponse)=>{
       
      if(response.status=200){
        const data = response.data as Product[];
        return data;
      }
      return [];
      
    })
  }


  getProductById(id: string){
    return CapacitorHttp.get({
      url: environment.urlApi + 'products/'+ id,
      params: {},
      headers: {
        'content-tytpe': 'apliocation/json'
      }
    }).then((response: HttpResponse)=>{
      if(response.status == 200){
        const data = response.data as Product;
        return data;
      }
      return null;
    })
  }



}
