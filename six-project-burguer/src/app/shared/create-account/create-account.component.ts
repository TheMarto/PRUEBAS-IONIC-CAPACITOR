import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { User } from 'src/app/models/user';
import { ToastService } from 'src/app/services/toast.service';
import { Login } from 'src/app/state/auth/auth.actions';
import { CreateUser } from 'src/app/state/users/users.actions';
import { UsersService } from 'src/app/state/users/users.service';
import { UsersState } from 'src/app/state/users/users.state';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TranslateModule, FormsModule],
})
export class CreateAccountComponent  {

  @Output() back: EventEmitter<boolean>;
  @Output() doCreateAcount: EventEmitter<boolean>;

  //const:
  public user: User;


  constructor(
    private store: Store,
    private toastServce: ToastService,
    private translateService: TranslateService,
  ) {
    this.back = new EventEmitter<boolean>();
    this.doCreateAcount = new EventEmitter<boolean>();
    this.user = new User();
   }
   //create account que comunica con el state users, su action and service
   createAcount(){
    this.store.dispatch(new CreateUser({user: this.user})).subscribe({
      next: ()=> {
        const success = this.store.selectSnapshot(UsersState.success);

        //comprobar y lanzar toast
        if(success){
          this.toastServce.showToast(
            this.translateService.instant('label.create.account.success')
          );
          this.doCreateAcount.emit(true);
          //trasemos codigo de login component para poder loguearlo al hacer la cuenta
          this.store.dispatch(new Login({
            email: this.user.email,
            password: this.user.password
          })).subscribe({
            next: ()=> {
              this.toastServce.showToast(
                this.translateService.instant('label.login.success')
            )}
          })
        }
        //si es error con toast
        else{
          this.toastServce.showToast(
            this.translateService.instant('label.create.account.error')
          )
        }
      }, 
      //si hay error general con su toast
      error: () => {
        this.toastServce.showToast(
          this.translateService.instant('label.create.account.error')
        )
      }
    })
   }

   exit(){
    this.back.emit(true);
   }


}
