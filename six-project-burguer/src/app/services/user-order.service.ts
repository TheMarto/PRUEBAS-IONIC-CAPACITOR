import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Preferences } from '@capacitor/preferences';
import { KEY_ORDER } from '../constants/constans';

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


}
