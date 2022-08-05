import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ServicesService } from '../services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  
  
  constructor(private servicio: ServicesService,
    private router: Router){
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    
    return this.servicio.verificarAuth()
    .pipe(
      tap( estaAutenticadoBoolean => {
          if(estaAutenticadoBoolean == false){
            this.router.navigate(['./auth/login'])
          }
        }
      )
    )
    /*
    if(this.servicio.auth.id){
      
      return true
    }  
    console.log("Bloauqeado por el CanActivate")

    return false
    */
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.servicio.verificarAuth()
      .pipe(
        tap( estaAutenticadoBoolean => {
            if(estaAutenticadoBoolean == false){
              this.router.navigate(['./auth/login'])
            }
          }
        )
      )
/*
      if(this.servicio.auth.id){
        console.log("Auth EXITOSO")
        return true
      }

      console.log("Bloauqeado por el guard")

      return false
      */
  }
}
