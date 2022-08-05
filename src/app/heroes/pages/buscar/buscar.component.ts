import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interface/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino: string = ''
  heroes: Heroe[] = []
  heroeSeleccionado!: Heroe
  constructor(private servicio: HeroesService) { }
  mensaje:string=""

  ngOnInit(): void {
  }

  buscando(){

    this.servicio.getSugerencias(this.termino).subscribe(heroes => {
      this.mensaje = ""
      this.heroes = heroes
      if(heroes.length == 0){
        this.mensaje = "NO HAY RESULTADOS"
      }
    })
    

    

  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){
    const heroe = event.option.value
    this.termino = heroe.superhero

    this.servicio.verHeroe(heroe.id).subscribe((heroe) => {
      this.heroeSeleccionado = heroe
    })

    
  }

}
