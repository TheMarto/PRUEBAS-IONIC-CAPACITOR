import { Pipe, PipeTransform } from '@angular/core';
import { pokemon } from '../models/pokemon';

@Pipe({
  name: 'getStart',

})
export class GetStartPipe implements PipeTransform {

  transform(value: pokemon,nameStat: string): number {
    
    const statFound = value.stats.find(s => s.stat.name == nameStat); //find name of stat

    if(statFound){ //if exist
      return statFound.base_stat;
    }
    return 0
  }

}
