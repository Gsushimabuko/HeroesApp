import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interface/heroe.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl:string = environment.baseUrl

  constructor(private http: HttpClient) { 
    
  }

  getHeroes(){
    return this.http.get<Heroe[]>( this.baseUrl+'/heroes')
  }

  verHeroe( idHeroe : string ):Observable<Heroe>{
    return this.http.get<Heroe>(this.baseUrl+ '/heroes/'+idHeroe)
  }

  getSugerencias(termino:string) :Observable<Heroe[]>{
    return this.http.get<Heroe[]>( this.baseUrl+'/heroes'+
    '?q='+termino+'&_limit=3')
  }

  agregarHeroe(heroe : Heroe):Observable<Heroe> {
    return this.http.post<Heroe>(this.baseUrl+'/heroes',heroe);
  }
  actualizarHeroe(heroe : Heroe):Observable<Heroe> {
    return this.http.put<Heroe>(this.baseUrl+'/heroes/'+heroe.id,heroe);
  }
  borrarHeroe(idHeroe: string):Observable<any> {
    return this.http.delete<any>(this.baseUrl+'/heroes/'+idHeroe);
  }
}
