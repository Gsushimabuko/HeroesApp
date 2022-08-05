import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent 
{

  constructor(private router:Router,private servicio:ServicesService) { }

  login(){

    //Ir al backend
    //ir al usuario

    this.servicio.login().subscribe(
      (resp) => {
        if(resp.id){
          this.router.navigate(['./heroes'])
        } 
      } )


  }
  
}
