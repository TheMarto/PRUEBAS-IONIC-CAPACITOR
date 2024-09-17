import { Component, OnInit } from '@angular/core';
import { pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
})
export class ListPokemonsPage implements OnInit {

  public pokemons: pokemon[];

  constructor(
    private pokemonServices: PokemonService,
  ) {
    this.pokemons = [];
   }

  ngOnInit() {

    this.morePokemon(); 
  }


  morePokemon($event = null){
    const promise = this.pokemonServices.getPokemons();

    if(promise){
      promise.then((result: pokemon[]) =>
      {
        console.log(result);
        this.pokemons = this.pokemons.concat(result);
        console.log(this.pokemons);

        if($event){
          $event.target.complete();
        }

      }).catch((err)=>{
        $event.target.complete();
      })
    }
  }

}
