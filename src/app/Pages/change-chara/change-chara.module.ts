// import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
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
// import { DashBoardModule } from '../dash-board/dash-board.module';
// import { PlayWithModule } from '../play-with/play-with.module';
// import { DrafPlyModule } from '../draf-ply/draf-ply.module';
// import { ChangeCharaModule } from '../change-chara/change-chara.module';

import { AppComponent } from '../../app.component';
import { ChangePlayerCharacteristicsComponent } from './change-player-characteristics/change-player-characteristics.component';
import { RawStatsComponent } from './raw-stats/raw-stats.component';
import { RawBoxScoresComponent } from './raw-box-scores/raw-box-scores.component';
import { SortableStatsComponent } from './sortable-stats/sortable-stats.component';
import { ChangeRoutingModule } from './change-routing.module';
// import { HeaderComponent } from '../header/header.component';


@NgModule({
  declarations: [
    ChangePlayerCharacteristicsComponent,
    RawStatsComponent,
    RawBoxScoresComponent,
    SortableStatsComponent,
    // HeaderComponent,
  ],
  imports: [
    
    ChangeRoutingModule,
    CommonModule,
    
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
export class ChangeCharaModule { }
