import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductExtra } from 'src/app/models/product-extra';

@Pipe({
  name: 'extrasSelected',
  standalone: true,
})
export class ExtrasSelectedPipe implements PipeTransform {

  constructor(
    private translate: TranslateService
  ){

  }
//convertimos para mostrar los array de cada producto pedido en el menu
  transform(value: ProductExtra[]): string[] {
    let optionsSelected: string[] = []; //recordar que tiene s options
//recorremos los extras y luego los blockes para tenerlo completo
    value.forEach(extra => {
      extra.blocks.forEach(block => {
        if(block.options.length == 1 && block.options[0].activate){
          optionsSelected.push(this.translate.instant(block.name));
        } // si tenemos mas de un lenght es que tenemos mas de un extra block
        else{
          const optionSelected = block.options.find(option => 
            option.activate
          );
          if(optionSelected){
            optionsSelected.push(this.translate.instant(block.name) + ': ' + this.translate.instant(optionSelected.name));
          }
        }
      })
    })
    return optionsSelected
  }

}
