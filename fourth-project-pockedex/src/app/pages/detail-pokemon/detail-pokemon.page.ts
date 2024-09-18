import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
})
export class DetailPokemonPage {
[x: string]: any;

  //const
  public pokemon: pokemon;


  //contructor
  constructor(
    private NavParams: NavParams,
    private NavController: NavController,
  ) {
    this.pokemon = this.NavParams.data["pokemon"];
    //console.log(this.pokemon);
   }

  goBack(){
    this.NavController.pop();
  }

}
