import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AllJobsComponent } from './components/jobs-crud/all-jobs/all-jobs.component';
import { JobReactiveFormComponent } from './components/jobs-crud/job-reactive-form/job-reactive-form.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent,children:[
    {path: '', redirectTo: '/home', pathMatch:'full'},
    {path: 'home', component: HomeComponent},
    {path: 'jobs', component: AllJobsComponent},
    {path: 'jobs/add', component: JobReactiveFormComponent},
    {path: 'jobs/edit/:id', component: JobReactiveFormComponent}
]},
{path:'**', component:NotFoundComponent} // wildcard path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
