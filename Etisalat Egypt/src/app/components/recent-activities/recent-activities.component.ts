import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IJob } from '../../interfaces/job';
import { JobsService } from '../../services/jobs.service';
import { log } from 'console';

@Component({
  selector: 'app-recent-activities',
  templateUrl: './recent-activities.component.html',
  styleUrl: './recent-activities.component.css'
})

export class RecentActivitiesComponent implements OnInit {

  recentJobActivities: IJob[]=[];

  constructor(private jobService:JobsService){

  }

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe({
      next:(data) =>{this.recentJobActivities= data},
      error:(error)=>{console.log('error'+error)},
      complete: ()=>{},
    });
    console.log(this.recentJobActivities);
  }

}
