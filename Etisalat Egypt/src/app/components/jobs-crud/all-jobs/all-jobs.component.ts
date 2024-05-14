import { Component } from '@angular/core';
import { IJob } from '../../../interfaces/job';
import { JobsService } from '../../../services/jobs.service';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrl: './all-jobs.component.css'
})

export class AllJobsComponent {

  jobs:IJob[] = [];

  constructor(private jobService:JobsService){}

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe({
      next:(data) =>{this.jobs= data},
      error:(error)=>{console.log('error'+error)},
      complete: ()=>{},
    });
    console.log(this.jobs);
  }

  delete(id:number){
    this.jobs = this.jobs.filter(job => job.id !== id);
    this.jobService.delete(id).subscribe();
  }
}
