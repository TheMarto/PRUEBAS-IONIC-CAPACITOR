import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Select, select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { GetProductsByCategory } from 'src/app/state/productos/products.actions';
import { ProductsState } from 'src/app/state/productos/products.state';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.page.html',
  styleUrls: ['./list-products.page.scss'],
})
export class ListProductsPage {

  @Select(ProductsState.products)
  private products$: Observable<Product[]>;

//const
private idCategory: string;
public products: Product[];
private subscription: Subscription;




  constructor(
    private navController: NavController,
    private navParams: NavParams,
    private store: Store,
    private loadingController: LoadingController,
    private translate: TranslateService
  ){
    
    this.products = [];
  }

//problema de recargar y que desaparezca (no passa en dispositivo)
  async ionViewWillEnter(){

    this.subscription = new Subscription();
    //console.log(this.navParams.data['idCategory']);
    this.idCategory = this.navParams.data['idCategory']; // guardo el idCategory en esta variable

    if(this.idCategory){

      //pantalla de carga
    const loading = await this.loadingController.create({
      message: this.translate.instant('label.loading'),
    });



    //metodo para obtener la lista
    await loading.present();

    //con el store llamos al servicio y cargamos los profuctos
      this.store.dispatch(new GetProductsByCategory({// llama a la accion
        idCategory: this.idCategory
      }))
      const sub = this.products$.subscribe({
        next:() => {
          this.products = this.store.selectSnapshot(ProductsState.products);
          //console.log(this.products)
          loading.dismiss();
        },
        error: (err)=>{
          console.error(err);
          loading.dismiss();
        },
      })
      
    }else{
      this,this.navController.navigateForward('categories')
    }
  }




//vamos a producto
  goToProduct(product: Product){
    this.navParams.data['product'] = product;
    this.navController.navigateForward('product');
    //console.log(product.extras)
  }

  //refresh methos
  refreshProducts($event){

    this.store.dispatch(new GetProductsByCategory({// llama a la accion
      idCategory: this.idCategory
    }))


    $event.target.complete();
  }




    //para dessucribir
    ionViewWillLeave(){
      this.subscription.unsubscribe();
    }
}
