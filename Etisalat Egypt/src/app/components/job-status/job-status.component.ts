import { Component, Input, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { ApplicationsService } from '../../services/applications/applications.service';
import { IJobStatus } from '../../interfaces/job-status';


@Component({
  selector: 'app-job-status',
  templateUrl: './job-status.component.html',
  styleUrl: './job-status.component.css'
})

export class JobStatusComponent implements OnInit {
  @Input() jobIdToSearch: number = 0;

  jobsStatus:IJobStatus={
    totalJobs:0,inProgress:0,success:0,failed:0,retry:0
  }

  constructor(private jobService:JobsService, private applicationsService:ApplicationsService){

  }

  ngOnChanges() {
    // This method will be called whenever the input data changes
    this.applicationsService.getApplicationsByJobID(this.jobIdToSearch).subscribe({
      next:(data) =>{
        this.jobsStatus= this.jobService.calcJobsStatusByAppsArray(data);
      },
      error:(error)=>{console.log('error'+error)},
      complete: ()=>{},
    });
  }

  ngOnInit(): void {
    this.applicationsService.getAllApplications().subscribe({
      next:(data) =>{
        this.jobsStatus= this.jobService.calcJobsStatusByAppsArray(data);
      },
      error:(error)=>{console.log('error'+error)},
      complete: ()=>{},
    });
    console.log(this.jobsStatus);
  }

  getChartUrl(): string {
    const { inProgress, success, failed } = this.jobsStatus;
    return `https://quickchart.io/chart/render/zm-1b6f36e6-37c5-4281-8131-fcc6574e5021?data1=${inProgress},${success},${failed}`;
  }
}
