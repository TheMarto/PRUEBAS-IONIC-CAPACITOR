import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetUser } from './users.actions';
import { UsersService } from './users.service';
import { UserOrderService } from 'src/app/services/user-order.service';
import { User } from 'src/app/models/user';

export class UsersStateModel {
  success: boolean;
}

const defaults = {
  success: false,
};

@State<UsersStateModel>({
  name: 'users',
  defaults
})
@Injectable()
export class UsersState {


  //agregamos selector
  @Selector()
  static success(state: UsersStateModel ){
    return state.success;
  }
  //agregamos el constructor
  constructor(
    private usersService: UsersService,
    private userOrderService: UserOrderService,
  ){}

  @Action(GetUser)
  getUser({ }: StateContext<UsersStateModel>, { payload }: GetUser) {
    return this.usersService.getUser(payload.email).then(async (user: User)=>{
      await this.userOrderService.saveUser(user);
    })
  }
}
