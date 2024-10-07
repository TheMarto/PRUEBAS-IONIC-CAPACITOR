import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { KEY_TOKEN } from 'src/app/constants/constans';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // info user
  async getUser(email:string){
    //traemos el token
    const token = await Preferences.get({key: KEY_TOKEN})
    //para obtenerlo con capacitorhttp y el email
    return CapacitorHttp.get({
      url: environment.urlApi + 'users',
      params: {
        email
      },
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + token.value
      }
    }).then((response: HttpResponse)=>{
      if(response.status == 200){
        const data = response.data as User;
        return data
      }
      return null;
    }).catch(err =>{
      console.error(err)
      return null; 
    })
  }

  //createUser para el state en @action
  createUser(user: User){
    
    //post para crear usuario
    return CapacitorHttp.post({
      url: environment.urlApi + 'users',
      params: {},
      data: {
        ...user
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response: HttpResponse)=>{
      if(response.status == 201){
        const data = response.data as boolean;
        return data
      }
      return false;
    }).catch(err =>{
      console.error(err)
      return false; 
    })
  }


}
