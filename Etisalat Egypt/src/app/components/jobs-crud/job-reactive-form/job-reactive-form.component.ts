import { IJob } from './../../../interfaces/job';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobsService } from '../../../services/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-reactive-form',
  templateUrl: './job-reactive-form.component.html',
  styleUrl: './job-reactive-form.component.css'
})
export class JobReactiveFormComponent {

  jobForm: FormGroup =new FormGroup({
    id:new FormControl(0),
    title:new FormControl('',[Validators.required]),
    salary:new FormControl('',[Validators.required,Validators.minLength(6000),Validators.maxLength(100000)]),
    totalJobs:new FormControl('',[Validators.required]),
    Date:new FormControl(new Date(),[Validators.required]),
    Type:new FormControl('',[Validators.required])
  });

  constructor(private jobService:JobsService,private activatedRoute:ActivatedRoute , private router:Router){}

  jobId:number=0;
  ngOnInit(): void {
    this.jobId = this.activatedRoute.snapshot.params['id'];
    if(this.jobId > 0){
      //edit
      //connect api get job
      this.jobService.getJob(this.jobId,'id').subscribe({
        next:(data) =>{
          this.jobForm.controls['id'].setValue(this.jobId);
          this.jobForm.controls['title'].setValue(data[0].title);
          this.jobForm.controls['salary'].setValue(data[0].salary);
          this.jobForm.controls['totalJobs'].setValue(data[0].totalJobs);
          this.jobForm.controls['Date'].setValue(data[0].Date);
          this.jobForm.controls['Type'].setValue(data[0].Type);
        },
        error:(error)=>{console.log('error'+error)},
        complete: ()=>{},
      });
    }
  }

  GetData(e:Event){
    e.preventDefault();
    if(this.jobForm.valid){
      if(this.jobId > 0){
        //edit
        console.log(this.jobId,this.jobForm.value);
        this.jobService.edit(this.jobId,this.jobForm.value).subscribe();
      }else{
        //add

        // Generate a random number between 1000 and 99999
        const randomId = Math.floor(1000 + Math.random() * 99999);
        this.jobForm.controls['id'].setValue(randomId);
        this.jobService.add(this.jobForm.value).subscribe();
      }
      
      this.router.navigate(['/jobs']);
    }
  }
}
