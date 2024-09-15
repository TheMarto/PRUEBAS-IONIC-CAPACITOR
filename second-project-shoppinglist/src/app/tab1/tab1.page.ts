import { Component } from '@angular/core';
import {ShoppingServicesService} from '../services/shopping-services.service'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public ShoppingServicesService:ShoppingServicesService,
               private alertcontroller: AlertController
  ) {}

  onRenderItem($event){
    //console.log($event)
    const item = this.ShoppingServicesService.items.splice($event.detail.from, 1)[0];  //splice devuelve array string de los que se eliminan
    
    this.ShoppingServicesService.items.splice($event.detail.to, 0, item);

    $event.detail.complete()//reset de  efecto

    console.log(this.ShoppingServicesService.items)
  }


  
 async removeItem(item: string){
    const alert = await this.alertcontroller.create({
      header:'Confirmation',
      message: 'The item will delete, you are sure?',
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

}
