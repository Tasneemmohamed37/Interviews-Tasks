import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent,children:[
    {path: '', redirectTo: '/home', pathMatch:'full'},
    {path: 'home', component: HomeComponent}
]},
{path:'**', component:NotFoundComponent} // wildcard path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
