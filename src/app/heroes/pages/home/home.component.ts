import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { ServicesService } from '../../../auth/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  get auth(){
    return this.servicio.auth
  }

  //auth!: Auth;  
  
  constructor(private router:Router,
    private servicio:ServicesService) { }

  ngOnInit(): void {
  }

  logout(){
    this.servicio.logout()
    this.router.navigate(['./'])
  }
}
