import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Preferences } from '@capacitor/preferences';
import { KEY_ORDER } from '../constants/constans';
import { Product } from '../models/product';
import { QuantityProduct } from '../models/quantity-product';
import { isEqual } from 'lodash-es'

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {


  //variables
  private order: Order;
  constructor() {
    this.initOrder();
   }

//iniciar ordenes
  async initOrder(){
    const order = await Preferences.get({key: KEY_ORDER});

    if(!order.value){
      this.clearOrder()
    }else{
      this.order = JSON.parse(order.value)
    }
  }
  //guardar ordenes en order
  async saveOrder(){
    await Preferences.set({key: KEY_ORDER, value: JSON.stringify(this.order)})
  }

//reset orders
  async resetOrder(){
    this.order.products = [];
    await this.saveOrder();
  }

  //limpiar orden
  async clearOrder(){
    this.order = new Order();
    this.order.products = [];
    await this.saveOrder();
  }

  //agregar productos:
  async addProduct(product: Product){
    const productFound = this.searchProduct(product);

    if(productFound){
      productFound.quiantity++;
    }else{
      this.order.products.push({
        product,
        quiantity:1, 
      })
    }
    //guadamos
   await this.saveOrder();
  }
  

  //saber si el elemento que tiene existe o no
  private searchProduct(product: Product){
    return this.order.products.find((p: QuantityProduct) => isEqual(p.product, product))
  }


  getProducts(){
    return this.order.products;
  }

  hasOrder(){
    return this.order && this.order.user;
  }

  //cantidad de productos para ver en el toolbar
  numProducts(){
    if(this.order && this.order.products.length > 0){
      return this.order.products.reduce((acum: number, value: QuantityProduct) => value.quiantity + acum, 0) 
      // funcion que suma las ordenes mas lo que ya tenemos acumulado empezando de 0
    }
    return 0;
  }


}
