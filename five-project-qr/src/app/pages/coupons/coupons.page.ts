import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CouponsService } from 'src/app/services/coupons.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
})
export class CouponsPage implements OnInit {

  public coupons: Coupon[];

  constructor(public CouponsService: CouponsService) { 
    this.coupons = [];
  }

  ngOnInit() {
    this.CouponsService.getCoupons().then((coupons: Coupon[])=> {
      this.coupons = coupons;
        console.log(this.coupons);
      })
  }
  changeActive(coupon: Coupon){
     coupon.active = !coupon.active
  }

}
