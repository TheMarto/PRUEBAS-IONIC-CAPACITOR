import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventType, Router, RoutesRecognized } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports:[IonicModule, CommonModule, TranslateModule]
})
export class ToolbarComponent  implements OnInit {
//methods
public showBack: boolean;

  constructor(
    private router: Router, //para lo del botton en el oninit
    private navController: NavController,
  ) { 
    this.showBack = false;
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
    this.navController.back()
  }

}
