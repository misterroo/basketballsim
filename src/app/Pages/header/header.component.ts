import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../../services/admin.service';
import * as $ from 'jquery';
import { NotifierService } from "angular-notifier";
import { SharedService } from 'src/app/services/shared.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  Data: any = []
  userName: any = '';
  token: any;
  userMode: string = 'login';
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
  uri:any = '';
  lastPath: any;
  private user: any;
  private loggedIn: boolean;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private notifierService: NotifierService,
    public sharedService: SharedService,
    private authService: SocialAuthService
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
    this.uri = this.router.url.split('/').pop();
    this.lastPath = window.location.href.split('/').pop()   
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

    this.authService.authState.subscribe((user) => {
      this.user = user;
    
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        if (this.userMode === 'login') {
          this.doSocialLogin(this.user);
        } else {
          this.doSocialRegister(this.user);
        }
      }
    });
  }
  async doSocialRegister(request) {
    let payload = {
      username: request.name,
      authtoken: request.id,
      apikey: 'Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A',
      email: request.email
    }
    this.spinner.show();
    (await this.adminService.socialRegister(payload)).subscribe(result => {
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
          this.notifierService.notify("success", "User registered successfully");
        } else {
          this.spinner.hide();
          this.notifierService.notify("error", this.result.message);
        }
      });
  }
  async doSocialLogin(request) {
    let payload = {
      username: request.name,
      authtoken: request.id,
      apikey: 'Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A'
    }
    this.spinner.show();
    (await this.adminService.socialLogin(payload)).subscribe(result => {
      this.result = result;
    }, (err) => console.log(err),
      () => {
        if (this.result && this.result.status === "true") {
          this.display = false;
          localStorage.setItem('userToken', this.result.data[0].id);
          localStorage.setItem('customerName', this.result.data[0].username)
          localStorage.setItem('userData', JSON.stringify(this.result))
          this.spinner.hide();
          // this.sharedService.changeToken(this.result.data[0].username);
          this.userName = localStorage.getItem('customerName');
          this.sharedService.updateToken(this.result.data[0].id);
          // this.router.navigate(['/dashboard']);
          this.router.navigate(['/dashboard3/singlegamecomponent']);
          this.notifierService.notify("success", "User login successfully");
          // window.location.reload();
        } else {
          this.spinner.hide();
          this.notifierService.notify("error", this.result.message);
        }
      });
  }
  loginWithGoogle() {
    this.userMode = 'login';
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signInWithFB(): void {
    this.userMode = 'login';
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  registerWithGoogle() {
    this.userMode = 'register';
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  registerWithFB(): void {
    this.userMode = 'register';
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
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
          // this.router.navigate(['/dashboard']);
          this.router.navigate(['/dashboard3/singlegamecomponent']);
          this.notifierService.notify("success", "User login successfully");
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
          this.notifierService.notify("success", "User registered successfully");
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
    this.userName = ''
    this.sharedService.changeToken('');
    this.sharedService.updateToken('');
    this.router.navigateByUrl('/');
    // window.location.reload();
  }
  showModalDialog(position: string) {
    // this.sharedService.changeModel(true);
    this.display = true
  }
  goToNext() {
    if (localStorage.getItem('userToken') === '' || localStorage.getItem('userToken') === null || localStorage.getItem('userToken') === undefined) {
      this.doGuestLogin();
    } else {
      this.router.navigate(['/dashboard/chooseteam']);
      setTimeout(()=>{
        this.lastPath = window.location.href.split('/').pop();
      },1000)
    }
  }
  goToSingleGame() {
    if (localStorage.getItem('userToken') === '' || localStorage.getItem('userToken') === null || localStorage.getItem('userToken') === undefined) {
      this.doGuestLogin();
    } else {
      this.router.navigate(['/dashboard3/singlegamecomponent']);
      setTimeout(()=>{
        this.lastPath = window.location.href.split('/').pop();
      },1000)
    }
  }
  goToDatabase() {
      this.router.navigate(['/dashboard/basketballdatabasecomponent']);
      setTimeout(()=>{
        this.lastPath = window.location.href.split('/').pop();
      },1000)
  }


  async doGuestLogin() {

    this.spinner.show();
    (await this.adminService.guestLogin()).subscribe(result => {
      this.guestResult = result;
    }, (err) => console.log(err),
      () => {
        this.spinner.hide();
        if (this.guestResult.status === 'true' || this.guestResult.status === true) {
          this.sharedService.updateToken(this.guestResult.data[0].id);
          localStorage.setItem('userToken', this.guestResult.data[0].id);
          this.router.navigate(['/dashboard/chooseteam']);
          // window.location.reload();
        }
      });
  }
}
