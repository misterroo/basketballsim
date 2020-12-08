import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../../../services/admin.service';
import * as $ from 'jquery';
import { NotifierService } from "angular-notifier";
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sessoinId: string;
  guestResult: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private notifierService: NotifierService,
    public sharedService: SharedService,

  ) {
    // this.sharedService.changedToken.subscribe(message => this.sessoinId = message);
    this.sessoinId = localStorage.getItem('userToken');
  }
  ngOnInit(): void {
    localStorage.setItem('isShow', ''); // advance seeting
  }

  goToNext() {
    if (localStorage.getItem('userToken') === '' || localStorage.getItem('userToken') === null || localStorage.getItem('userToken') === undefined) {
      this.doGuestLogin();
    } else {
      this.router.navigate(['/dashboard/chooseteam']);
    }
  }
  goToActual() {
    if (localStorage.getItem('userToken') === '' || localStorage.getItem('userToken') === null || localStorage.getItem('userToken') === undefined) {
      this.doGuestLogin();
    } else {
      this.router.navigate(['/dashboard/actualplayer']);
    }
  }
  async doGuestLogin() {

    this.spinner.show();
    (await this.adminService.guestLogin()).subscribe(result => {
      this.guestResult = result;
    }, (err) => console.log(err),
      () => {
        this.spinner.hide();
        if (this.guestResult.status === 'true' || this.guestResult.status === true) {
          console.log(this.guestResult);
          this.sharedService.updateToken(this.guestResult.data[0].id);
          localStorage.setItem('userToken', this.guestResult.data[0].id);
          this.router.navigate(['/dashboard/chooseteam']);
          // window.location.reload();
        }
      });
  }
  // showResetPasswordModalDialog() {
  //   this.showResetPassword = true;
  //   this.showOTP = false;
  //   this.showForgot = false;
  //   this.display = false;
  // }


}

