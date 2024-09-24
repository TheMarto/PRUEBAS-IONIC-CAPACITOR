import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Product } from 'src/app/models/product';
import { ProductExtraOptions } from 'src/app/models/Product-extra-options';
import { GetProductsById } from 'src/app/state/productos/products.actions';
import { ProductsState } from 'src/app/state/productos/products.state';

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
    private translate: TranslateService,
    private store: Store
     
  ) {
    //console.log(this.navParams.data['idCategory']);
    this.product = this.navParams.data['product']; // guardo el product en esta variable
   }

  ngOnInit() {
//no entiendo porque no mete eesto es la función de abajo
    if(this.product && this.product.extras){
      this.total = this.product.price
      //console.log(ProductsState.product)
    }


//si no hay prodicts go to categories
    if(!this.product){
      this.navController.navigateForward('categories');
      //console.log(this.product.extras)
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
    //obteniendo el total sumamos al totalTotal
    this.total = +total.toFixed(2);
  }

  
  //aquí llama para refrescar la pagina
  getProduct($event){
    //console.log($event)

    this.store.dispatch(new GetProductsById({id: this.product._id})).subscribe({
      next: () =>{
        this.product = this.store.selectSnapshot(ProductsState.product);
        //console.log(this.store.selectSnapshot(ProductsState.product))
        this.calculateTotal();
      },
      complete: ()=>{
        $event.target.complete();
      }
    })
  }



}
