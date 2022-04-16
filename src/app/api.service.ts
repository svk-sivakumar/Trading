import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {  throwError } from 'rxjs';
import { retry, catchError, delay } from 'rxjs/operators';

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
  constructor(private httpClient: HttpClient) { }
  
  public get(){ 
    return this.httpClient.get(this.SERVER_URL); 
    } 
    public async getAsync(url:any){ 
      const result = await this.httpClient.get(url,this.httpOptions)
      .pipe(delay(1000))
      .toPromise(); 
      console.log(result);
      return result;
    } 
    public getURL(url:any, i?:any){ 
      if(i%10==0)
      {
        for(var j=1;j<=800000000;j++)
        {
          j++;
        }
        console.log(i.toString()+"Paused");
        //setTimeout(() => {
          
       

      }
      return this.httpClient.get(url,this.httpOptions);
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
