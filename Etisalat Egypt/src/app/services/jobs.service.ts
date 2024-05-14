import { IJobStatus } from './../interfaces/job-status';
import { Injectable } from '@angular/core';
import { IJob } from '../interfaces/job';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { IApplication } from '../interfaces/application';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  // TODO: add base url to env file to be global 
  baseUrl:string = 'http://localhost:3000'; 

  constructor(private httpClient:HttpClient,private handleError:HandleErrorService) 
  { 

  }

  getAllJobs():Observable<IJob[]>
  {
    return this.httpClient.get<IJob[]>(`${this.baseUrl}/jobs`)
    .pipe(
      retry(2),
      catchError(this.handleError.handleError)
    );
  }


  getJob(filterID:number, queryParam:string):Observable<IJob[]>{
    return this.httpClient.get<IJob[]>(`${this.baseUrl}/jobs?${queryParam}=${filterID}`)
    .pipe(
      retry(2),
      catchError(this.handleError.handleError)
    );
  }

  calcJobsStatusByAppsArray(applications:IApplication[]):IJobStatus
  {
    const jobStatus: IJobStatus = {
      totalJobs: applications.length,
      inProgress: 0,
      success: 0,
      failed: 0,
      retry: 0
    };
  
    applications.forEach(application => {
      switch (application.status) {
        case 'In Progress':
          jobStatus.inProgress++;
          break;
        case 'Success':
          jobStatus.success++;
          break;
        case 'Failed':
          jobStatus.failed++;
          break;
        default:
          jobStatus.retry++;
          break;
      }
    });
  
    return jobStatus;
  }

  add(job:IJob) {
    return this.httpClient.post(`${this.baseUrl}/jobs`,job);
  }

  edit(id:number , job:IJob):Observable<IJob> {
    return this.httpClient.put<IJob>(`${this.baseUrl}/jobs/${id}`,job);
  }

  delete(id:number):Observable<void>{
    return this.httpClient.delete<void>(`${this.baseUrl}/jobs/${id}`);
  }

}
