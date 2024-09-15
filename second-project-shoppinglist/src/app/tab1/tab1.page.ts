import { Component } from '@angular/core';
import {ShoppingServicesService} from '../services/shopping-services.service'
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public ShoppingServicesService:ShoppingServicesService, private alertcontroller: AlertController, private menuController: MenuController) {}

  onRenderItem($event){
    //console.log($event)
    const item = this.ShoppingServicesService.items.splice($event.detail.from, 1)[0];  //splice devuelve array string de los que se eliminan
    
    this.ShoppingServicesService.items.splice($event.detail.to, 0, item);

    $event.detail.complete()//reset de  efecto

    console.log(this.ShoppingServicesService.items)
  }


  // remove per element
 async removeItem(item: string){
    const alert = await this.alertcontroller.create({
      header:'Confirmation',
      message: 'The item will remove, you are sure?',
      buttons: [
        {
        text: 'yes',
        handler: () => {
          this.ShoppingServicesService.removeItem(item);
        }
      },
        {
          text: 'no',
          handler: () => {
            alert.dismiss()
          }
        
      }]

    });
    await alert.present();
  }

  //remove all elements
  async removeAllItems(){
    const alert = await this.alertcontroller.create({
      header: 'Confirmation',
      message: 'All items will be remove, are you sure?',
      buttons:[
        {
          text:'yes',
          handler:()=>{
            this.ShoppingServicesService.remuveAll();
            this.menuController.close();
          }
        },
        {
          text:'no',
          handler:()=>{
            alert.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }

}
