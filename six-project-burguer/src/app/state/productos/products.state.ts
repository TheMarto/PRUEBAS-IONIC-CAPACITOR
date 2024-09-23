import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetProductsByCategory, GetProductsById } from './products.actions';
import { ProductService } from './product.service';
import { Product } from 'src/app/models/product';

export class ProductsStateModel {
  products: Product[];
  product: Product;
}

const defaults = {
  products:[],
  product: null 
};

@State<ProductsStateModel>({
  name: 'products',
  defaults
})
@Injectable()
export class ProductsState {


  @Selector()
  static products(state: ProductsStateModel){
    return state.products;
  }

  @Selector()
  static product(state: ProductsStateModel){
    return state.product;
  }
  

  constructor(private productServices: ProductService){}

  @Action(GetProductsByCategory)
  GetProductsByCategory({ getState, setState }: StateContext<ProductsStateModel>, { payload }: GetProductsByCategory) {
    return this.productServices.getProductByCategory(payload.idCategory).then((products: Product[])=>{
      const state = getState();
      setState({
        ...state,
        products
      })
    })
  }

  @Action(GetProductsById)
  GetProductsById({ getState, setState }: StateContext<ProductsStateModel>, { payload }: GetProductsById) {
    return this.productServices.getProductById(payload.id).then((product: Product)=>{
      const state = getState();
      setState({
        ...state,
        product
      })
    })
  }
}
