import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap,tap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interface/heroe.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {


  @Input () heroe! : Heroe;
  

  constructor( private activatedRoute: ActivatedRoute, 
     private servicio: HeroesService,
     private router: Router) {

   }

  ngOnInit(): void {

    
  this.activatedRoute.params
  .pipe(
    switchMap( ({id}) => this.servicio.verHeroe(id)),
    tap( console.log )
  )
    .subscribe( heroe => {
      this.heroe = heroe
      console.log("HEROEE", this.heroe)
    })
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}
