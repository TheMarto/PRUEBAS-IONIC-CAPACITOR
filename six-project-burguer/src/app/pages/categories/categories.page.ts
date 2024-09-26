import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { GetCategories } from 'src/app/state/categories/categories.actions';
import { CategoriesState } from 'src/app/state/categories/categories.state';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage {
  
  @Select(CategoriesState.categories)
  private categories$: Observable<Category[]>;


//const
public categories: Category[];
private subscription: Subscription;

  constructor(
    private store: Store,
    private loadingController: LoadingController,
    private translate: TranslateService,
    private navController: NavController, 
    private navParams: NavParams,
  ) { 
    this.categories = [];
  }

  ionViewWillEnter(){
    this.subscription = new Subscription();
    this.loadData()
  }




  async loadData(){
//pantalla de carga
    const loading = await this.loadingController.create({
      message: this.translate.instant('label.loading'),
    });
    await loading.present();
//obtenemos categorias y quitamos el loding con su respectico error
    this.store.dispatch(new GetCategories());// dispatch llama a la accion
    this.categories$.subscribe({ 
      next: () => {
        this.categories =  this.store.selectSnapshot(CategoriesState.categories)
        loading.dismiss()
        //console.log(this.categories); 
      }, error: (err) =>{
        console.log(err);
        loading.dismiss();
      },
    });
  }

//al presionar la card vamos a list-productos y pasamos el _id de category
  goToProducts(category: Category){
    this.navParams.data['idCategory'] = category._id;
    this.navController.navigateForward('list-products')
  }
//metoth for refresh the page
  refreshCategories($event){
    this.store.dispatch(new GetCategories());

    $event.target.complete();
  }

//funtion when we leave
  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }


  
}
