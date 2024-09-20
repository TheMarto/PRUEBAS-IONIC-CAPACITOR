import { Component, OnInit } from '@angular/core';
import { IonFab, NavController, NavParams } from '@ionic/angular';
import { Coupon } from 'src/app/models/coupon';
import { CouponsService } from 'src/app/services/coupons.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
})
export class CouponsPage implements OnInit {


  //variables
  public coupons: Coupon[];
  public couponsActive: boolean;


  constructor(
    public CouponsService: CouponsService,
    private navParams: NavParams,
    private navController: NavController,
  ) { 
    this.coupons = [];
    this.couponsActive = false;
  }
 

//activamos coupos desde el oninit
  ngOnInit() {
    this.CouponsService.getCoupons().then((coupons: Coupon[])=> {
      this.coupons = coupons;
        //console.log(this.coupons);
      })
  }


  //cambiar activo o no
  changeActive(coupon: Coupon){
     coupon.active = !coupon.active;
     this.couponsActive = this.coupons.some(c => c.active);// devuelve true o false dependiendo de si esta activo alguno del array con some
  }
  //vamos a la otra pagina con la info
  goToCard(){
    this.navParams.data["coupons"] = this.coupons.filter(c => c.active);
      this.navController.navigateForward('card-coupon');
  }
  
}
