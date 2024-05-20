import { Component, OnInit } from '@angular/core';
import { IJob } from '../../../interfaces/job';
import { JobsService } from '../../../services/jobs.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.css']
})
export class AllJobsComponent implements OnInit {

  jobs: IJob[] = [];

  constructor(private jobService: JobsService, private router: Router) {
    // Subscribe to router events to detect when the component is being navigated to and then refresh the job list.
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Refresh the job list on navigation end
      this.loadJobs();
    });
  }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (data) => { this.jobs = data },
      error: (error) => { console.log('error' + error) },
      complete: () => {},
    });
  }

  delete(id: number): void {
    this.jobs = this.jobs.filter(job => job.id !== id);
    this.jobService.delete(id).subscribe({
      next: () => { this.loadJobs() },
      error: (error) => { console.log('error' + error) }
    });
  }
}
