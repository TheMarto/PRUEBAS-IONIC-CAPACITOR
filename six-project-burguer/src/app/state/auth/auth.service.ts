import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { TokenUser } from 'src/app/models/token-user';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //   metoth for login
  login(email:string, password: string){
    return CapacitorHttp.post({
      url: environment.urlApi + 'auth/login',
      data: {
        email,
        password
      },
      params:{},
      headers: {
        'Content-Type': 'application/json'
      }      
    }).then((response: HttpResponse)=>{
      if(response.status == 201){
        const data = response.data as TokenUser;
        return data;
      }
      if(response.status == 401){console.log("error 401")}
      if(response.status == 400){console.log("error 400")}
      return null;
    }).catch(err => {
      console.error(err);
      return null;
    })
  }


}
