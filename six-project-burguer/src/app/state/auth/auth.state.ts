import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Login } from './auth.actions';
import { AuthService } from './auth.service';
import { TokenUser } from 'src/app/models/token-user';
import { Preferences } from '@capacitor/preferences';
import { KEY_TOKEN } from 'src/app/constants/constans';

export class AuthStateModel {

  //variables
  success: boolean;

 
}

const defaults = {
  success: false

};

@State<AuthStateModel>({
  name: 'auth',
  defaults
})
@Injectable()
export class AuthState {

  //selector para enviar el success
  @Selector()
  static success(state: AuthStateModel){
    return this.success;
  }

  // creo el constructor para poder llamar a mi servicio 
  constructor(
    private AuthService: AuthService,
  ){}


  @Action(Login)
  Login({ setState }: StateContext<AuthStateModel>, { payload }: Login) {
    return this.AuthService.login(payload.email, payload.password).then(async (token: TokenUser)=>{
      if(token){
        await Preferences.set({key: KEY_TOKEN, value: token.accessToken});
        setState: ({success: true})
      }
      else{
        setState: ({success: false})
      }
    }).catch(err => {
      setState: ({success: false})
    })
  }
}
