import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingServicesService {

  //variables
  public items: string [];
  public isEmpty: boolean;

  constructor() {

    this.items = [];
    this.isEmpty = true;

  }

  //methods

  //add item
  addItems(item:string){
    this.items.push(item);
    this.isEmpty = false;
  }

  //Remuve item
  removeItem(item: string, String?: StringConstructor){
    let index = this.items.findIndex(it => it.toUpperCase().trim() === item.toUpperCase().trim()); //toUppserCase hace mayusculas y trim elimina espacios
    if(index !=-1){
      this.items.splice(index, 1); //desde que posición empiezo and que eliminamos
      if(this.items.length == 0){
        this.isEmpty = true;
      }
    }
  }

  //remuve all items
  remuveAll(){
    this.items = [];
    this.isEmpty = true;
  }

  //Find
  existItem(item: string){
    const itemFound = this.items.find(it => it.toLocaleUpperCase().trim() === item.toLocaleUpperCase().trim());
    return itemFound;
  }
}
