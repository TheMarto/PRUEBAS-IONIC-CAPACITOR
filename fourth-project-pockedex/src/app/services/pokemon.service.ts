import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private nextUrl: string;

  constructor() { 
    this.nextUrl = "https://pokeapi.co/api/v2/pokemon?offset=00&limit=20"
  }
  

  getPokemons(){

    const url = this.nextUrl;

    if(url){

      const  options = {
        url,
        headers: {},
        params:{},
      }
      return CapacitorHttp.get(options).then(async (response)=>{
        let pokemons: pokemon[] = [];
        //console.log(response);
        
        if(response.data){
          const results = response.data.results;
          this.nextUrl = response.data.next;
          //console.log(this.nextUrl);
          const promises: Promise<HttpResponse>[] = [];
          for (let index = 0; index < results.length; index++){
            const pokemon = results[index];
            const urlpokemon = pokemon.url; 
            const options = {
              url: urlpokemon,
              headers: {},
              params:{},
            }
            promises.push(CapacitorHttp.get(options));
          }
          await Promise.all(promises).then((responses)=>{
          //console.log(responses)
          for(const response of responses){
            const pokemonData = response.data;
            //console.log(pokemonData);

            const pokemonObjt = new pokemon();
            pokemonObjt.id = pokemonData.order;
            pokemonObjt.name = pokemonData.name;
            pokemonObjt.type1 = pokemonData.types[0].type.name;
            pokemonObjt.type2 = pokemonData.types[1]

            if(pokemonData.types[1]){
              pokemonObjt.type2 = pokemonData.types[1].type.name
            }
            
            pokemonObjt.sprite = pokemonData.sprites.front_default;
            
            pokemonObjt.weight = pokemonData.weight / 10;
            pokemonObjt.height = pokemonData.height / 10;
            pokemonObjt.stats = pokemonData.stats;
            pokemonObjt.abilities = pokemonData.abilities.filter(ab => !ab.is_hidden).map(ab => ab.ability.name);

            const hiddenAbility = pokemonData.abilities.find(ab => ab.is_hidden);
            if(hiddenAbility){
              pokemonObjt.hiddenAbility = hiddenAbility.ability.name;
            }
            pokemons.push(pokemonObjt);
            
          }
          }
          );
        }
        return pokemons;
        
      })
    }
    return null
  }

}
