import { Donut } from './../model/donut.model';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { catchError, map, of, retry, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: null
})
export class DonutService {
  private donuts : Donut[]=[];
  constructor(private http:HttpClient) { }

  read(){
    if(this.donuts.length){
      return of(this.donuts)
    }

    let headers = new HttpHeaders({
      'Content-Type':'application/json',

    });

    headers = headers.append('Api-Token','1234abcd')

    const options = {
      headers
    };

    return this.http.get<Donut[]>(`/api/donuts`,options)
    .pipe(
      tap((donuts)=>this.donuts=donuts),
      retry({count:2,delay:5000,resetOnSuccess:true}),
      catchError(this.handleError)
    )
  }

  readById(id:number|null){
    return this.read()
    .pipe(
      map((donuts)=>{
        const donut = donuts.find((donut:Donut)=> donut.id===id)
        if (donut){
          return donut
        }

        return {name:'',icon:'',price:0,description:''}
      })
    )
  }

  create(payload: Donut){
    return this.http.post<Donut>(`/api/donuts`,payload)
    .pipe(
      tap((donut)=>{
        this.donuts = [...this.donuts,donut] //se le pasa el donut en vez del payload, porque ya viene con el id
      }),
      catchError(this.handleError)
    )
  }

  update(payload: Donut){
    return this.http.put<Donut>(`/api/donuts/${payload.id}`,payload)
    .pipe(
      tap((donut:Donut)=>{
        this.donuts = this.donuts.map((item:Donut)=>{
          if(item.id===donut.id){
            return donut
          }
          return item
        });
      }),
      catchError(this.handleError)
    )
  }

  delete(payload:Donut){
    return this.http.delete<Donut>(`/api/donuts/${payload.id}`)
    .pipe(
      tap(()=>{
        this.donuts=this.donuts.filter((item:Donut)=>item.id !== payload.id)
      }),
      catchError(this.handleError)
    )
  }

  private handleError(err:HttpErrorResponse){

    if(err.error instanceof ErrorEvent){
      //En esta caso el error es del lado del cliente
      console.warn('Client',err.message);
    }else{
      //Por otro lado, si no es ErrorEvent es de parte del servidor
      console.warn('Server',err.status);
    }
    return throwError(()=>new Error(err.message));//minuto 7
  }


}
