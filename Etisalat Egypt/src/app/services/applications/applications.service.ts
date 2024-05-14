import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { HandleErrorService } from '../handle-error.service';
import { IApplication } from '../../interfaces/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  // TODO: add base url to env file to be global 
  baseUrl:string = 'http://localhost:3000';
  applications: IApplication[]=[];


  constructor(private httpClient:HttpClient,private handleError:HandleErrorService) { }


  getAllApplications():Observable<IApplication[]>
  {
    return this.httpClient.get<IApplication[]>(`${this.baseUrl}/applications`)
    .pipe(
      retry(2),
      catchError(this.handleError.handleError)
    );
  }


  getApplicationsByJobID(jobID:number):Observable<IApplication[]>
  {
    return this.httpClient.get<IApplication[]>(`${this.baseUrl}/applications?jobID=${jobID}`)
    .pipe(
      retry(2),
      catchError(this.handleError.handleError)
    );
  }
}
