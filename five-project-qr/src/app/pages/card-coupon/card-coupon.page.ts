import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-card-coupon',
  templateUrl: './card-coupon.page.html',
  styleUrls: ['./card-coupon.page.scss'],
})
export class CardCouponPage implements OnInit {

//consts
  public QRCode: string;

  constructor(
    private navParams:NavParams,
    private QRCodeModule:QRCodeModule,
  ) {
    //console.log(JSON.stringify(this.navParams.data['coupons']))
   }

  ngOnInit() {
    this.QRCode = JSON.stringify(this.navParams.data['coupons']);
  }

}
