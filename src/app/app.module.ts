import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MessageService, } from 'primeng/api';
import { CommonModule, DatePipe } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { AuthGuardService } from '../services/auth-guard.service';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { AdminService } from 'src/services/admin.service';
import { SharedService } from './services/shared.service';
import { HeaderComponent } from './Pages/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotifierModule } from 'angular-notifier';

import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    NgbModule,
    CheckboxModule,
    ButtonModule,
    SliderModule,
    TableModule,
    ToastModule,
    CalendarModule,
    ConfirmDialogModule,
    DropdownModule,
    DialogModule,
    TabViewModule,
    ScrollPanelModule,
    RadioButtonModule,
    PaginatorModule,
    CommonModule,
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
     NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 30,
          gap: 10
        }
      },
      theme: 'material',
      behaviour: {
        autoHide: 2000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease'
        },
        hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50
        },
        shift: {
          speed: 300,
          easing: 'ease'
        },
        overlap: 150
      }
    }),
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AdminService, MessageService, ConfirmationService, DatePipe, CookieService, SharedService,NgbActiveModal, { provide: AuthGuardService, useClass: AuthGuardService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
