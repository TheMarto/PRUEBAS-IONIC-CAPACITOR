import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'coupons',
    pathMatch: 'full'
  },
  {
    path: 'coupons',
    loadChildren: () => import('./pages/coupons/coupons.module').then( m => m.CouponsPageModule)
  },
  {
    path: 'card-coupon',
    loadChildren: () => import('./pages/card-coupon/card-coupon.module').then( m => m.CardCouponPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
