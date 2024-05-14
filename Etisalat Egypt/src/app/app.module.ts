import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { JobStatusComponent } from './components/job-status/job-status.component';
import { RecentActivitiesComponent } from './components/recent-activities/recent-activities.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllJobsComponent } from './components/jobs-crud/all-jobs/all-jobs.component';
import { JobReactiveFormComponent } from './components/jobs-crud/job-reactive-form/job-reactive-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    JobStatusComponent,
    RecentActivitiesComponent,
    HomeComponent,
    NotFoundComponent,
    MainLayoutComponent,
    NumberFormatPipe,
    AllJobsComponent,
    JobReactiveFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
