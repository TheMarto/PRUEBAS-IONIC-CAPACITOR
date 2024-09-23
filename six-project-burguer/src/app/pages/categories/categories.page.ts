import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Category } from 'src/app/models/category';
import { GetCategories } from 'src/app/state/categories/categories.actions';
import { CategoriesState } from 'src/app/state/categories/categories.state';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

//const
public categories: Category[];


  constructor(
    private store: Store,
    private loadingController: LoadingController,
    private translate: TranslateService,
    private navController: NavController, 
    private navParams: NavParams,
  ) { 
    this.categories = [];
  }

  ngOnInit() {
    this.loadData()
  }



  async loadData(){
//pantalla de carga
    const loading = await this.loadingController.create({
      message: this.translate.instant('label.loading'),
    });
    await loading.present();
//obtenemos categorias y quitamos el loding con su respectico error
    this.store.dispatch(new GetCategories()).subscribe({ // dispatch llama a la accion
      next: () => {
        this.categories =  this.store.selectSnapshot(CategoriesState.categories)
        //console.log(this.categories); 
      }, error: (err) =>{
        console.log(err);
        loading.dismiss();
      },
      complete: ()=> {
        loading.dismiss()
      }
    });
  }

//al presionar la card vamos a list-productos y pasamos el _id de category
  goToProducts(category: Category){
    this.navParams.data['idCategory'] = category._id;
    this.navController.navigateForward('list-products')
  }


}
