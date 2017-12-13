import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OfficeListComponent } from './components/office-list/office-list.component';
import { PersonnelListComponent } from './components/personnel-list/personnel-list.component';
import { PersonnelCardComponent } from './components/personnel-card/personnel-card.component';
import { AppRoutingModule } from './/app-routing.module';
import { CommonService } from './service/common-service.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OfficeListComponent,
    PersonnelListComponent,
    PersonnelCardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
