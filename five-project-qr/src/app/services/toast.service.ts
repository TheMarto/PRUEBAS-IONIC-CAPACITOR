import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) {}


  // here we can use this message only inject message(amazing)
  async showToast(message: string, duration = 4000) {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'top',
    });

    await toast.present();
  }
}
