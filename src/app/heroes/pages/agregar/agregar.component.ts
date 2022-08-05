import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interface/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { WarningComponent } from '../../components/warning/warning.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {


  heroe: Heroe = {
    superhero:"",
    alter_ego:"",
    first_appearance:"",
    escuela: "UA",
    alt_img : ""
  }
  escuelas = [
    {
      id: 'UA'
    },
    {
      id: 'Otro'
    }
  ]

  constructor(private servicio:HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog:MatDialog ) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar') ){
      return
    }

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.servicio.verHeroe(id))
    )
    .subscribe( (heroe) => this.heroe = heroe)

  }
  guardar(){
    if( this.heroe.superhero.trim().length === 0){
      return
    }

    if(this.heroe.id) {
      //UPDATE
      this.servicio.actualizarHeroe( this.heroe)
      .subscribe (heroe => this.mostrarSnackbar("¡Registro actualizado!"))
      this.router.navigate(['/heroes'])
    }else{
      //CREATE
      this.servicio.agregarHeroe(this.heroe).subscribe(heroe => {
        this.mostrarSnackbar("¡Registro creado!")
        this.router.navigate(['/heroes/editar/'+heroe.id])
      })
    }

  }
  borrar(){
    //WARNING
  const dialog = this.dialog.open(WarningComponent, {width: '250px',
  data: this.heroe})

  dialog.afterClosed().subscribe((result) =>{
    if(result) {
      this.servicio.borrarHeroe(this.heroe.id!).subscribe(resp => {
      this.mostrarSnackbar("¡Registro borrado!")
      this.router.navigate(['/heroes'])})
    }
  })

  
  }

  mostrarSnackbar( mensaje:string ){
    this.snackBar.open(mensaje, 'ok', {duration:2000})
  }
}
