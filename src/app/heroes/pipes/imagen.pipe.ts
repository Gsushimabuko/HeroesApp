import { Pipe, PipeTransform } from '@angular/core';
import {Heroe} from '../interface/heroe.interface'

@Pipe({
  name: 'imagen',
  pure: false //COMPONENTE SE ACTUALIZA SIEMPRE
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {

    if (heroe.alt_img ==""){
      return `assets/heroes/logo.jpg`
    }

    if (!heroe.id && !heroe.alt_img){
      return `assets/heroes/logo.jpg`
    } else if (heroe.alt_img){
      return heroe.alt_img
    } else{
      
      return ` assets/heroes/${heroe.id}.jpg`
    }

  }

}
