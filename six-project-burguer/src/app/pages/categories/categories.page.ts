import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Category } from 'src/app/models/category';
import { GetCategories } from 'src/app/state/categories.actions';
import { CategoriesState } from 'src/app/state/categories.state';

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
  ) { 
    this.categories = [];
  }

  ngOnInit() {
    this.loadData()
  }
  loadData(){

    this.store.dispatch(new GetCategories()).subscribe({ // dispatch llama a la accion
      next: () => {
        this.categories =  this.store.selectSnapshot(CategoriesState.categories)
        //console.log(this.categories); 
      }
    });
  }

}
