import { HttpResponse } from '@capacitor/core';
import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  getCategories(){
    return CapacitorHttp.get({
      url: environment.urlApi + 'categories',
      params: {},
      headers: {
        'content-type': 'aplication/json'
      }
    }).then( async (response: HttpResponse) => {
      if(response.status == 200){
        const data = response.data as Category[];
        return data;
      }
      return [];
    }).catch(err => {
      console.error(err);
      return [];
    })
  }
}
