import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../../services/admin.service';
import * as $ from 'jquery';
import { NotifierService } from "angular-notifier";
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  Data: any = []
  userName: any = '';
  token: any;

  display: boolean = false;
  position: string
  model: any = {
    "username": "",
    "password": "",
    "apikey": "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
    "email": "",
    "username1": "",
    "email1": "",
    "password1": ""
  };
  modelforgot: any = {
    "username": "",
    "password": "",
    "apikey": "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
    "email": "",
    "username1": "",
    "emailForgot": "",
    "password1": ""
  }
  result: any;
  registerData: any;
  showLogin: boolean = true;
  showRegister: boolean = false;
  showForgot = false;
  showOTP = false;
  showResetPassword = false;
  modelShow = false;
  sessoinId: string;
  guestResult: any;
  pageUrl: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private notifierService: NotifierService,
    public sharedService: SharedService,
  ) {
    this.sharedService.currentModel.subscribe(message => {
      if (message === true) {
        this.display = true;
        this.showLogin = true;
        this.showRegister = false;
        this.position = 'center';
      } else {
        this.display = false;
        this.showRegister = false;
        this.showLogin = false;
        this.position = 'center';
      }
    });
    // this.sharedService.changedToken.subscribe(message => this.sessoinId = message);
    this.sessoinId = localStorage.getItem('userToken');
    // this.sharedService.currentToken.subscribe(message => this.userName = message);
  }

  @ViewChild('registerForm', { static: false }) registerForm: NgForm;
  @ViewChild('loginForm', { static: false }) loginForm: NgForm;
  @ViewChild('forgotForm', { static: false }) forgotForm: NgForm;

  ngOnInit(): void {
    
    var current_url=window.location.href;
    var pageUrlll=current_url.substr(current_url.lastIndexOf('/') + 1);
    this.pageUrl = pageUrlll;
    this.userName = localStorage.getItem('customerName')
    // console.log('ffsfdf', this.userName)
    // this.Data = JSON.parse(localStorage.getItem('userData'));
    // if (this.Data) {
    //   // console.log(this.Data.data[0].username)
    //   this.userName = this.Data.data[0].username
    //   this.sharedService.changeToken(this.userName);
    // }

    // this.sharedService.currentToken.subscribe(message => this.userName = message);
  }
  async login() {

    this.spinner.show();
    (await this.adminService.login(this.model)).subscribe(result => {
      this.result = result;
    }, (err) => console.log(err),
      () => {
        if (this.result.status == "true") {
          this.display = false;
          localStorage.setItem('userToken', this.result.data[0].id);
          localStorage.setItem('customerName', this.result.data[0].username)
          localStorage.setItem('userData', JSON.stringify(this.result))
          this.spinner.hide();
          this.loginForm.resetForm();
          // this.sharedService.changeToken(this.result.data[0].username);
          this.userName = localStorage.getItem('customerName');
          this.sharedService.updateToken(this.result.data[0].id);
          this.router.navigate(['/dashboard']);
          this.notifierService.notify("success", "user login successfully");
          // window.location.reload();
        } else {
          this.spinner.hide();
          this.notifierService.notify("error", this.result.message);
        }
      })
  }

  async register() {

    this.spinner.show()
    // const formData = new FormData();

    let formData = new FormData();
    formData.append('username', this.model.username1);
    formData.append('password', this.model.password1);
    formData.append('apikey', 'Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A');
    formData.append('email', this.model.email1);
    (await this.adminService.signup(this.model)).subscribe(result => {
      this.result = result;
    }, (err) => console.log(err),
      () => {
        this.spinner.hide();
        if (this.result.status == "true") {
          this.registerData = this.result.status;
          this.showRegister = false;
          this.showLogin = true;
          this.registerForm.resetForm();
          this.spinner.hide();
          this.notifierService.notify("success", "user register successfully");
        } else {
          this.spinner.hide();
          this.notifierService.notify("error", this.result.message);
        }
      })
  }

  async forgot() {

  }

  closeModel(e) {
    // console.log(e,"*")
    this.display = false;
    this.loginForm.resetForm();
    this.registerForm.resetForm();
    // this.showLogin = true;
    // if(e.index == 0){
    //   this.showLogin = true
    //   this.showRegister = false
    // }else{
    //  this.showLogin = false
    //   this.showRegister = true
    // }
  }
  onTabChange(e) {
    console.log(e)
    if (e.index == 0) {
      this.showLogin = true;
      this.showRegister = false;
    } else {
      this.showLogin = false;
      this.showRegister = true;
    }
  }

  showforgotModalDialog() {
    this.showForgot = true;
    this.display = false;
    this.showOTP = false;
    this.showResetPassword = false;
  }

  showOTPModalDialog() {
    this.showOTP = true;
    this.showForgot = false;
    this.display = false;
  }
  logout() {
    localStorage.clear();
    this.sharedService.changeToken('');
    this.sharedService.updateToken('');
    this.router.navigateByUrl('/');
  }
  showModalDialog(position: string) {
    // this.sharedService.changeModel(true);
    this.display = true
  }
}
