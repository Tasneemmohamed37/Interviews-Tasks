import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchComponentJobId:number=0;

  getJobIdFromSearchComponent(id:number){
    this.searchComponentJobId=id;
  }
}
