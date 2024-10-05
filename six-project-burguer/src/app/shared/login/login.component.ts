import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { User } from 'src/app/models/user';
import { ToastService } from 'src/app/services/toast.service';
import { Login } from 'src/app/state/auth/auth.actions';
import { AuthState } from 'src/app/state/auth/auth.state';
import { GetUser } from 'src/app/state/users/users.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule]
})
export class LoginComponent  {

  //decoration
  @Input() showBack: boolean = true;

  @Output() newAccount: EventEmitter<boolean>;
  @Output() back: EventEmitter<boolean>;
  @Output() doLogin: EventEmitter<boolean>;


  // variables
  public user: User;

  //constructor what we have store(for auth state), toast and translate services
  constructor(
    private store: Store,
    private toastServices: ToastService,
    private translateService: TranslateService,
  ) { 
    this.user = new User();
    this.newAccount = new EventEmitter<boolean>();
    this.back = new EventEmitter<boolean>();
    this.doLogin = new EventEmitter<boolean>();
  }
  

  //envia login
  login(){
    this.store.dispatch(new Login({
      email: this.user.email,
      password: this.user.password
    })).subscribe({
      next: () => {
        const success = this.store.selectSnapshot(AuthState.success);
        //mensaje dependiendo de auth and success
        if(success){
          this.toastServices.showToast(
            this.translateService.instant('label.login.success')
          ),
          this.store.dispatch(new GetUser({email: this.user.email}))
          this.doLogin.emit(true)
        }
        else{
          this.toastServices.showToast(
            this.translateService.instant('label.login.error')
          )
        }
      }, error: ((err) => {
        this.toastServices.showToast(
          this.translateService.instant('label.login.error')
        )
      })
    })
  }


  //for get out of sing
  exit(){
    this.back.emit(true);
  }

  //create Account
  createNewAccount(){
    this.newAccount.emit(true);
  }
}
