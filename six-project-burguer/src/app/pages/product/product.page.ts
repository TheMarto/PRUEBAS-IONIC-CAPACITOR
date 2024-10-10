import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Product } from 'src/app/models/product';
import { ProductExtraOptions } from 'src/app/models/Product-extra-options';
import { ToastService } from 'src/app/services/toast.service';
import { UserOrderService } from 'src/app/services/user-order.service';
import { GetProductsById } from 'src/app/state/productos/products.actions';
import { ProductsState } from 'src/app/state/productos/products.state';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage {

  //const
  public product: Product;
  public total: number;

  constructor(
    private navParams: NavParams,
    private navController: NavController,
    private translate: TranslateService,
    private store: Store,
    private userOrderServices: UserOrderService,
    private toastServices: ToastService,
    
     
  ) {
    this.product = null;
   }

   ionViewWillEnter(){

    //console.log(this.navParams.data['idCategory']);
    this.product = this.navParams.data['product']; // guardo el product en esta variable

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
    //todo el codigo nos hemos llevado al servicio de user-order y le mandamos el product nada mas
    this.total = this.userOrderServices.priceProduct(this.product);

  }

  
  //aquí llama para refrescar la pagina
  getProduct($event){
    //console.log($event)

    this.store.dispatch(new GetProductsById({id: this.product._id})).subscribe({
      next: () =>{
        this.product = this.store.selectSnapshot(ProductsState.product);
        console.log(this.store.selectSnapshot(ProductsState.product))
        this.calculateTotal();
      },
      complete: ()=>{
        $event.target.complete();
      }
    })
  }

  addProductOrder(){
    this.userOrderServices.addProduct(this.product);
    //console.log(this.userOrderServices.getProducts())
    this.toastServices.showToast(
      this.translate.instant('label.product.add.success')
    );
    this.navController.navigateForward('/');
  } 


  
}
