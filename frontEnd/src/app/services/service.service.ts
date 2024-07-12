import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url = 'http://127.0.0.1:8000/api';
  private accessTokenKey='access';
  private refreshTokenKey='refresh';

  constructor(private http: HttpClient, private route:Router) { }

  registrarUsuario(formData: any) {
    const url=this.url+'/registro/';
    return this.http.post( url,formData);
  }

  loginUser(username:string, password:string):Observable<any>
  {
   const url=this.url+'/login/';
   return this.http.post<any>(url,{username,password}).pipe(tap(response=>{
    if(response.access && response.refresh){
      console.log(response.token)
      this.setTokens(response.access,response.refresh);}
  }
  ));;
  }

  private setTokens(access:string,refresh:string):void{
   localStorage.setItem(this.accessTokenKey,access);//seteo el valor del accessTokenKey con el valor del parametro access
   localStorage.setItem(this.refreshTokenKey,refresh);
  }

  private getAccessTokenKey():string | null{
    return localStorage.getItem(this.accessTokenKey);
  }

  private getRefreshTokenKey():string | null{
    return localStorage.getItem(this.refreshTokenKey);
  }
  
  isAuthenticated():boolean{
    const token=this.getAccessTokenKey();
    if(!token)
      return false;
    const payload=JSON.parse(atob(token.split('.')[1]));
    const exp=payload.exp*1000;
    return Date.now()<exp;
  }

  logout():void{
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.route.navigate(['/login']);//aqui me redirecciona ala pantalla login
  }
}