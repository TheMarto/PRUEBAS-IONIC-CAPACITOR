import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Preferences } from '@capacitor/preferences';
import { KEY_ORDER } from '../constants/constans';
import { Product } from '../models/product';
import { QuantityProduct } from '../models/quantity-product';
import { isEqual, remove } from 'lodash-es'
import { User } from '../models/user';

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

  //de lo que viene de state users para obtener datos de usuario y aqui lo guardamos
  async saveUser(user: User){
    delete user.password // no queremos la contrase;a por ende lo quitamos al guardar 
    this.order.user = user;
    await this.saveOrder()
  }

  //more o less products
  //more
  async oneMoreProduct(product: Product){
    const productFound = this.searchProduct(product);
    if(productFound){
      productFound.quiantity++;
    }
    await this.saveOrder();
  }

  //Less
  async oneLessProduct(product: Product){
    const productFound = this.searchProduct(product);
    if(productFound){
      productFound.quiantity--;
      if(productFound.quiantity == 0){
        this.removeProduct(product);
      }
    }
    await this.saveOrder();
  }

  //funcion tapa eliminar el producto (si es 0)
  async removeProduct(product: Product){
    remove(this.order.products, p => isEqual(p.product, product));
    await this.saveOrder();
  }


}
