import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
})
export class ListPokemonsPage implements OnInit {

  public pokemons: pokemon[];


  //constructor
  constructor(
    private pokemonServices: PokemonService,
    private LoadingController: LoadingController,
    private NavParams: NavParams,
    private NavController: NavController,
  ) {
    this.pokemons = [];
   }

  ngOnInit() {

    this.morePokemon(); 
  }
//methods

  async morePokemon($event = null){
    const promise = this.pokemonServices.getPokemons();
// del servicio y el metodo getPokemon donde tenemos la constante
    if(promise){  // si existe
      let loading = null;
      if(!$event){ // si no existe evento ponemos mensaje de cargando hasta obtenerlo
        loading = await this.LoadingController.create({
          message: 'Loading...'
        })
        await loading.present();
      }
      promise.then((result: pokemon[]) => //cargamos el array
      {
        //console.log(result);
        this.pokemons = this.pokemons.concat(result);
        //console.log(this.pokemons);

        if($event){ //evento de carga
          $event.target.complete();
        }
        if(loading){
          loading.dismiss();
        }

      }).catch((err)=>{
        $event.target.complete();
      })
    }
  }



  //method para obtener el boton al pokemon 
  goToDetails(pokemon){
    this.NavParams.data["pokemon"] = pokemon;//le paso a la otra pagina la data que se llama pokemon que será igual a pokemon que traigo del service

    this.NavController.navigateForward("detail-pokemon")//ir aquí y llevar la info
  }

}
