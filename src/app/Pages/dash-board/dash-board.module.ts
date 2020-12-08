// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { AppRoutingModule } from './app-routing.module';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashRoutingModule } from './dash-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation';
import { AuthGuardService } from '../../../services/auth-guard.service';
import { CookieService } from 'ngx-cookie-service';
import { Ng5SliderModule } from 'ng5-slider';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { PaginatorModule } from 'primeng/paginator';
import { MessageService, } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AdminService } from 'src/services/admin.service';
import { SharedService } from '../../services/shared.service';
import { DashboardComponent } from '../dash-board/dashboard/dashboard.component';

// import { DashboardComponent } from './dashboard/dashboard.component';

import { AppComponent } from '../../app.component';
import { BasketBallDatabaseComponent } from './basket-ball-database/basket-ball-database.component';
import { ActualPlayerStatisticsComponent } from './actual-player-statistics/actual-player-statistics.component';
import { ChooseTeamComponent } from './choose-team/choose-team.component';
import { ChooseMyTeamComponent } from './choose-my-team/choose-my-team.component';
// import { HeaderComponent } from '../header/header.component';



@NgModule({
  declarations: [
    DashboardComponent,
    BasketBallDatabaseComponent,
    ActualPlayerStatisticsComponent,
    ChooseTeamComponent,
    ChooseMyTeamComponent,
    // HeaderComponent,
  ],
  imports: [
    DashRoutingModule,
    CommonModule,
    // AppRoutingModule

    // BrowserModule,
    // AppRoutingModule,
    // BrowserAnimationsModule,
    
    CheckboxModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    SliderModule,
    HttpClientModule,
    TableModule,
    ToastModule,
    CalendarModule,
    ConfirmDialogModule,
    CustomFormsModule,
    Ng5SliderModule,
    DropdownModule,
    DialogModule,
    InfiniteScrollModule,
   
    TabViewModule,
    ScrollPanelModule,
    RadioButtonModule,
    PaginatorModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AdminService, MessageService, ConfirmationService, DatePipe, CookieService, SharedService, { provide: AuthGuardService, useClass: AuthGuardService }],
})
export class DashBoardModule { }
