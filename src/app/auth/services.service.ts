import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap, of, map } from 'rxjs';
import { Auth } from './interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl: string = environment.baseUrl
  private _auth: Auth | undefined

  get auth(): Auth{
    return { ...this._auth! }
  }

  constructor(private http: HttpClient) { 

  }

  verificarAuth(): Observable<boolean>{

    if(!localStorage.getItem('token')){
      return of(false) // return false;
    }

    return this.http.get<Auth>(this.baseUrl + '/usuarios/1').pipe(
      map( auth => {
        this._auth = auth
        return true
      } )
    )

    
  }

  login(){
   return this.http.get<Auth>(this.baseUrl + '/usuarios/1')
   .pipe(
      tap( resp /* usuario */ => this._auth = resp),
      tap( resp /* usuario */ => localStorage.setItem('token', resp.id) )
    
   )
  }
  logout(){
    localStorage.setItem('token', "")
    this._auth = undefined;
  }

}
