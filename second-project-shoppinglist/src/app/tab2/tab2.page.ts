import { Component } from '@angular/core';
import { ShoppingServicesService } from "../services/shopping-services.service";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
public item:string;
  constructor(
      private ShoppingServicesService:ShoppingServicesService,
    private alertcontroller: AlertController     
  ) {}


  //methods
  addItem(){
    
    if(!this.ShoppingServicesService.existItem(this.item)){
      this.ShoppingServicesService.addItems(this.item);
      this.item = '';
      console.log(this.ShoppingServicesService.items);
      this.alertSuccess();
    }
    else{
      this.alertError();
  }
  }


  //alert success
  async alertSuccess() {
      const alert = await this.alertcontroller.create({
        header: 'Success',
        message: 'Add Item',
        buttons: ['OK']

      })
      await alert.present()
      setTimeout(()=>{
      alert.dismiss();  
    }, 2000);
  }
  
  //alert error
  async alertError() {
    const alert = await this.alertcontroller.create({
      header: 'Error',
      message: 'Item exist yet',
      buttons: ['OK']

    })
    await alert.present()
    setTimeout(()=>{
      alert.dismiss();  
    }, 2000);
}
}
