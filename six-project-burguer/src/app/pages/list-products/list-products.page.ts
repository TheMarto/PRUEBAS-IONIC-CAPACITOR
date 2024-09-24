import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Product } from 'src/app/models/product';
import { GetProductsByCategory } from 'src/app/state/productos/products.actions';
import { ProductsState } from 'src/app/state/productos/products.state';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.page.html',
  styleUrls: ['./list-products.page.scss'],
})
export class ListProductsPage implements OnInit {

//const
private idCategory: string;
public products: Product[];




  constructor(
    private navController: NavController,
    private navParams: NavParams,
    private store: Store,
    private loadingController: LoadingController,
    private translate: TranslateService
  ){
    //console.log(this.navParams.data['idCategory']);
    this.idCategory = this.navParams.data['idCategory']; // guardo el idCategory en esta variable
    this.products = [];
  }

  async ngOnInit() {

    //con el store llamos al servicio y cargamos los profuctos
    if(this.idCategory){

      //pantalla de carga
    const loading = await this.loadingController.create({
      message: this.translate.instant('label.loading'),
    });



    //metodo para obtener la lista
    await loading.present();

      this.store.dispatch(new GetProductsByCategory({// llama a la accion
        idCategory: this.idCategory
      })).subscribe({
        next:() => {
          this.products = this.store.selectSnapshot(ProductsState.products);
          //console.log(this.products)
        },
        error: (err)=>{
          console.error(err);
        },
        complete: ()=> {
          loading.dismiss()
        }
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


    $event.target.complete();
  }

}
