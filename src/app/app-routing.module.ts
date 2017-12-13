import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OfficeListComponent } from './components/office-list/office-list.component';

const routes: Routes = [{
  'path': 'dashboard',
  'component': DashboardComponent
}, {
  'path': '',
  'redirectTo': '/dashboard',
  'pathMatch': 'full',
}, {
  'path': 'officeList',
  'component': OfficeListComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
