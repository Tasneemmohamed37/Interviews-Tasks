import { Component, EventEmitter, Output } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { log } from 'console';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent {

  searchOption: string = 'id'; // Default value is 'Job ID'
  searchValue: number|any;
  idOfJobWantToGetStatus:number = 0;
  @Output() myEvent: EventEmitter<number> = new EventEmitter<number>();


    constructor(private jobService:JobsService){
    }

    search() {
      console.log("Search Option:", this.searchOption);
      console.log("Search Value:", this.searchValue);

      this.jobService.getJob(this.searchValue,this.searchOption).subscribe({
        next:(data) =>{
          this.idOfJobWantToGetStatus= data[0].id;
          this.myEvent.emit(this.idOfJobWantToGetStatus);
        },
        error:(error)=>{console.log('error'+error)},
        complete: ()=>{},
      });
  }
}
