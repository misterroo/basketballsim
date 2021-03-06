// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation'
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
import { ToggleButtonComponent } from './toggle-button-component';
import { DashboardComponent } from '../dash-board/dashboard/dashboard.component';

import { PlayWithAllTeamsComponent } from './play-with-all-teams/play-with-all-teams.component';
import { AdvancedSettingQtrTableComponent } from './advanced-setting-qtr-table/advanced-setting-qtr-table.component';

import { SingleGameComponent } from './single-game/single-game.component';
import { PlayRoutingModule } from './play-routing.module';

import { SubstitutionPatternComponent } from './substitution-pattern/substitution-pattern.component';
import { SubstitutionPatternSingleGameComponent } from './substitution-pattern-single-game/substitution-pattern-single-game.component';
import { ChangePlayerCharacteristicsComponent } from './change-player-characteristics/change-player-characteristics.component';
import { RawStatsComponent } from './raw-stats/raw-stats.component';
import { RawBoxScoresComponent } from './raw-box-scores/raw-box-scores.component';
import { SortableStatsComponent } from './sortable-stats/sortable-stats.component';
import { SortableBoxScoreComponent } from './sortable-box-score/sortable-box-score.component';
import { DraftPlayerComponent } from './draft-player/draft-player.component';
import { DraftPlayerSingleGameComponent } from './draft-player-single-game/draft-player-single-game.component';

import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PlayWithAllTeamsComponent,
    AdvancedSettingQtrTableComponent,
    SingleGameComponent,
    ToggleButtonComponent,

    SubstitutionPatternComponent,
    SubstitutionPatternSingleGameComponent,
    ChangePlayerCharacteristicsComponent,
    RawStatsComponent,
    RawBoxScoresComponent,
    SortableStatsComponent,
    SortableBoxScoreComponent,
    DraftPlayerComponent,
    DraftPlayerSingleGameComponent
    
  ],
  entryComponents:[
    SubstitutionPatternSingleGameComponent,
    DraftPlayerSingleGameComponent
  ],
  imports: [
    PlayRoutingModule,
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
export class PlayWithModule { }
