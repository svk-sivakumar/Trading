import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {  throwError } from 'rxjs';
import { retry, catchError, delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private SERVER_URL = "http://localhost:3000/products";
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Authorization': 'Bearer key'
        // 'key': 'x-api-key',
        // 'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',

    })
  };
  constructor(private httpClient: HttpClient, private _activatedRout: ActivatedRoute) { 
    this.getJSON().subscribe(data => {
      console.log(data);
    });
  }
  public getJSON(): Observable<any> {
    return this.httpClient.get("assets/company.json");
}
  public get(url:any){ 
    return this.httpClient.get(url); 
    } 
    public async getAsync(url:any){ 
      const result = await this.httpClient.get(url,this.httpOptions)
      .pipe(delay(1000))
      .toPromise(); 
      console.log(result);
      return result;
    } 
    public getURL(url:any, i?:any){ 
      // if(i%1500==0)
      // {
      //   for(var j=1;j<=40000000;j++)
      //   {
      //     j++;
      //   }
      //   console.log(i.toString()+"Paused");
      //   //setTimeout(() => {
      // }
      return this.httpClient.get(url,this.httpOptions);//.pipe(delay(1000));
    } 

    handleError(error: HttpErrorResponse) {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
      } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
      }
      public sendGetRequest(){
        return this.httpClient.get(this.SERVER_URL).pipe(catchError(this.handleError));
        }      
}
