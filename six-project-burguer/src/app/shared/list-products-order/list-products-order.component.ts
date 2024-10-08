import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UserOrderService } from 'src/app/services/user-order.service';
import { CreateAccountComponent } from '../create-account/create-account.component';

@Component({
  selector: 'app-list-products-order',
  templateUrl: './list-products-order.component.html',
  styleUrls: ['./list-products-order.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule, CreateAccountComponent]
})
export class ListProductsOrderComponent {


  //variables
  public userOrderService: UserOrderService;
  constructor() { }

 

}
