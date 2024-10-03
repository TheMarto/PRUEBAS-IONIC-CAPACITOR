import { Injectable } from '@angular/core';
import { State, Action, StateContext, select, Selector } from '@ngxs/store';
import { Login } from './auth.actions';
import { AuthService } from './auth.service';

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
  Login({ getState, setState }: StateContext<AuthStateModel>, { payload }: Login) {
  }
}
