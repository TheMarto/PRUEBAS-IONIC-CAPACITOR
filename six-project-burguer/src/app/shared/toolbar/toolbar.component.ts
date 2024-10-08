import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventType, Router, RoutesRecognized } from '@angular/router';
import { IonicModule, MenuController, NavController, ToastController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { UserOrderService } from 'src/app/services/user-order.service';
import { LoginComponent } from "../login/login.component";
import { Preferences } from '@capacitor/preferences';
import { KEY_TOKEN } from 'src/app/constants/constans';

import { ToastService } from 'src/app/services/toast.service';
import { CreateAccountComponent } from "../create-account/create-account.component";
import { ListProductsOrderComponent } from "../list-products-order/list-products-order.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TranslateModule, LoginComponent, LoginComponent, CreateAccountComponent, CreateAccountComponent, ListProductsOrderComponent]
})
export class ToolbarComponent  implements OnInit {
//methods
public showBack: boolean;
public showInfoUser: boolean;
public showCreateAccount: boolean;
public showOder: boolean;

  constructor(
    private router: Router, //para lo del botton en el oninit
    private navController: NavController,
    public userOrderService: UserOrderService,
    private menuController: MenuController,
    private toastService: ToastService,
    private translateService: TranslateService,
  ) { 
    this.showBack = false;
    this.showInfoUser = false;
    this.showOder = false;
  }

  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event.type == EventType.RoutesRecognized)
    ).subscribe({
      next: (event: RoutesRecognized) => {
        //console.log(event.state.root.firstChild.data);
        this.showBack = event.state.root.firstChild.data['showBack']
      }
    })
  }
//go back
  goBack(){
    this.navController.back();
  }



  showPanelInfoUser(){
    this.showInfoUser = true;
  }

  async logout(){
    await this.userOrderService.clearOrder();
    await Preferences.remove({key: KEY_TOKEN});
    this.navController.navigateForward('categories')
    this.menuController.close('content');
    this.toastService.showToast(
      this.translateService.instant('label.logout.success')
    )
  }


  //back funtion
  back(){
    this.showInfoUser = false;   
    this.showCreateAccount = false;
    this.showOder = false;
  }

  //para poner truw show create account const
  newAccount(){
    this.showCreateAccount = true;
  }

  //para volver al login estando en create account
  showLogin(){
    this.showCreateAccount = false;
  }
}
