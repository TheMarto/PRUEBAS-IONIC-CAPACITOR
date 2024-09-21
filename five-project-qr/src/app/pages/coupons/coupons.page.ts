import { Component, OnInit } from '@angular/core';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerScanResult } from '@capacitor/barcode-scanner';
import { IonFab, NavController, NavParams } from '@ionic/angular';
import { Coupon } from 'src/app/models/coupon';
import { CouponsService } from 'src/app/services/coupons.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
})
export class CouponsPage implements OnInit {


  //variables
  public coupons: Coupon[];
  public couponsActive: boolean;

//CONSTRUCTOR
  constructor(
    public CouponsService: CouponsService,
    private navParams: NavParams,
    private navController: NavController,
    private toastService:ToastService,
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
    this.navParams.data["coupons"] = this.coupons.filter(c => c.active);//devuelve lo que tiene en true
      this.navController.navigateForward('card-coupon');
  }



  //method to reed the qr-code with camera
  startCamera(){
    CapacitorBarcodeScanner.scanBarcode({
      hint: 0 //tipo de QR 
    }).then((value:CapacitorBarcodeScannerScanResult)=> {

    const resultqr = value.ScanResult;

    try {
      let couponqr: Coupon = JSON.parse(resultqr);


    if(this.isCouponValid(couponqr)){
      this.coupons.push(couponqr)
      this.toastService.showToast('successfully scanning QR')
    }
    else{
      this.toastService.showToast('QR Invalid')
    }        
      } 
    catch (error) {
        this.toastService.showToast('QR error')
        console.error(error)
      }


    
    })
  }




  //
  private isCouponValid(coupon: Coupon){
    return coupon && coupon.idProducto && coupon.img && coupon.name && coupon.discount;
  }
  
}
