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
  public total: number;

  constructor(
    private navParams: NavParams,
    private navController: NavController,
    private translate: TranslateService
     
  ) {
    //console.log(this.navParams.data['idCategory']);
    this.product = this.navParams.data['product']; // guardo el product en esta variable
   }

  ngOnInit() {
//no entiendo porque no mete eesto es la función de abajo
    if(this.product && this.product.extras){
      this.total = this.product.price
    }


//si no hay prodicts go to categories
    if(!this.product){
      this.navController.navigateForward('categories');
      console.log(this.product.extras)
    }
  }


  //se activa al tener ociones distintas en el checkbox
  changeMultipleOption($event, options: ProductExtraOptions[]){

    options.forEach(op => op.activate = $event.detail.value == op.name);

    //activamos method para sumar todo
    this.calculateTotal();
  }
 



  //Calcula el total haciendo foreach en cada opcion marcada
  calculateTotal(){
    let total = this.product.price;

    this.product.extras.forEach(extra =>{
      extra.blocks.forEach(block=>{
        if(block.options.length == 1 && block.options[0].activate){ //fo one product
          total +=  block.options[0].price;
        }else if(block.options.length > 1){ //for more than one
          const options = block.options.find(op => op.activate);
          if(options){
            total += options.price;
          }
          
        }
      })
    
    })
    this.total = +total.toFixed(2);
  }

  //obteniendo el total sumamos al totalTotal
  



}
