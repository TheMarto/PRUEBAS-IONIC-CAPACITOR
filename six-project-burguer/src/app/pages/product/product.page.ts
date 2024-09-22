import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Product } from 'src/app/models/product';
import { ProductExtraOptions } from 'src/app/models/Product-extra-options';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  //const
  public product: Product;


  constructor(
    private navParams: NavParams,
    private navController: NavController,
    private translate: TranslateService
     
  ) {
    //console.log(this.navParams.data['idCategory']);
    this.product = this.navParams.data['product']; // guardo el product en esta variable
   }

  ngOnInit() {

    if(!this.product){
      this.navController.navigateForward('categories');
      console.log(this.product.extras)
    }
  }


  //se activa al tener ociones distintas en el checkbox
  changeMultipleOption($event, options: ProductExtraOptions[]){
    console.log($event);

    options.forEach(op => op.activate = $event.detail.value == op.name);
//AQUI QUITAR ESTOS LOGS!!!!!!!!!
    console.log(options);
    console.log(this.product)
  }

}
