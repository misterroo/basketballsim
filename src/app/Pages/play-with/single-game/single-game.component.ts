import { Component, OnInit, ViewChildren, ViewChild, QueryList, ElementRef } from '@angular/core';
import {Location} from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../../../services/admin.service';
import { NotifierService } from 'angular-notifier';
import { Router} from '@angular/router';
import { ColorPicker } from 'primeng';
import { Console } from 'console';
import { $ } from 'protractor';
import * as jQuery from 'jquery';
import { SharedService } from '../../../services/shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubstitutionPatternSingleGameComponent } from '../substitution-pattern-single-game/substitution-pattern-single-game.component';
@Component({
  selector: 'app-single-game',
  templateUrl: './single-game.component.html',
  styleUrls: ['./single-game.component.scss']
})
export class SingleGameComponent implements OnInit {
  @ViewChildren('plpLoop') plpLoop: QueryList<any>;
  @ViewChild('plpContent') plpContent: ElementRef;
  position: string
  showSubstitution: boolean = false;
  displayModal: boolean = false;
  play_by_playComments:any = [];
  rawBoxScore:any = []
  play_Single_Stats:any = []
  play_Single_Initial:any = []
  getPlay_Single_Stp:any  =[]
  count:any ="1";
  count_Single:number =0;
  leag_name:any =""
  teams_n:any =""

  model: any = {
    'season': '',
    'season1': '',
    'opponent': '',
    'team':'',
    'gameNumber': ''
  }
  seasonValue: any;
  teamValue: any;
  opponentValue: any;
  teamData: any = []
  seasonData: any = []
  opponentData: any=[]
  enableDisableStatus: any;
  field_Check:any = {item:""};
  locate_disable:boolean = true;
  button_disable :boolean = true;
  button_disable1 :boolean = true;
  button_dis_Away :boolean = true;
  button_dis_Home :boolean = true;
  raw_New: any =[]
  tempData:any = [];
  tempTeamData:any = [];
  chatCount = 1;
  pushedDataLength:number = 0;
  showableChatData:any = [];
  dont_Pause:any = []
  option:any="1"
  oneononeData:any
  lo:any

  constructor(
    private _location: Location,
    private router: Router,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private notifierService: NotifierService,
    private shared: SharedService,
    private modalService: NgbModal,
  ) { 
    
    // if(localStorage.getItem('SeasonName') != ""){
    // this.model.season = {league_name:localStorage.getItem('SeasonName')}
    // this.seasonValue = localStorage.getItem('SeasonName');
    // // this.model.season = {league_name:localStorage.getItem('Seasoame')}
    // this.opponent();  
    // this.team();
    // }
    // if(localStorage.getItem('homeTeam') != ""){
    // console.log(localStorage.getItem('homeTeam'))
    // this.model.team = {teams:localStorage.getItem('homeTeam')}
    // this.locate_disable = false;
    //   this.button_disable1 =false;
    //   this.button_dis_Away = false;   
    //   this.button_dis_Home = false;
    // }
    // if(localStorage.getItem('awayTeam') != ""){
    // console.log(localStorage.getItem('awayTeam'))
    // this.model.opponent = {teams:localStorage.getItem('awayTeam')}
    // this.locate_disable = false;
    //   this.button_disable1 =false;
    //   this.button_dis_Away = false;   
    //   this.button_dis_Home = false;
    // }
    
    
  }

  ngOnInit(): void {
    this.season();
  }
  ngAfterViewInit() {
    this.scrollToBottom();
    this.plpLoop.changes.subscribe(this.scrollToBottom);
  }
  scrollToBottom(){
    try {
      this.plpContent.nativeElement.scrollTop = this.plpContent.nativeElement.scrollHeight;
    } catch (err) {}
  }
  toggleMenu(): void{
    this.showSubstitution = false;
  }
  goSubPattern(status) {
    
    if (status === 'Away') {
      if (this.teamValue) {
        this.showSubstitution = true;
        const modalRef = this.modalService.open(SubstitutionPatternSingleGameComponent,
          {
            scrollable: true,
            windowClass: 'myCustomModalClass',
            size: 'lg'
            // keyboard: false,
            // backdrop: 'static'
          });
    
        let data = {
          seasonName: this.seasonValue,
          teamName: this.teamValue
        }
    
        modalRef.componentInstance.fromParent = data;
        modalRef.result.then((result) => {
          console.log(result)
        }, (reason) => {
        });
      } 
      
    } else {
      if (this.opponentValue) {
        this.showSubstitution = true;
        const modalRef = this.modalService.open(SubstitutionPatternSingleGameComponent,
          {
            scrollable: true,
            windowClass: 'myCustomModalClass',
            size: 'lg'
            // keyboard: false,
            // backdrop: 'static'
          });
    
        let data = {
          seasonName: this.seasonValue,
          teamName: this.opponentValue
        }
    
        modalRef.componentInstance.fromParent = data;
        modalRef.result.then((result) => {
          console.log(result)
        }, (reason) => {
        });
      } 
      
    }
    
  }
  
    showModalDialog() {
      this.displayModal = true;
    }

    backClicked() {
      this._location.back();
    }

    reset(){
      this.locate_disable = true
      this.button_disable = true
      this.teamData = []     
      this.model = {
        'season': '',
        'season1': '',
        'opponent': '',
        'team':'',
        'gameNumber': ''
      }
      this.opponentData =[]
      this.play_by_playComments = [];
      this.rawBoxScore = []
      this.play_Single_Stats = []
      this.count =""
      // this. field_Check = null;
      // this.field_Check= {item:""};
    }

    async season() {
      let data = {"apikey":"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
      "league_name": this.leag_name,       
     }
      let Token: string = localStorage.getItem('userToken');
      this.spinner.show();
      let resultData
      (await this.adminService.get_season(Token)).subscribe(result => {
        resultData = result;
      },   
      (err) =>{ this.spinner.hide();
        if(err.status == 401){
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
        }
      },  
        () => {  
         
          if (resultData.status == "true") {
            this.spinner.hide();
            this.seasonData = resultData.data 
            let objectName = {
              league_name: 'CHOOSE A SEASON',
              _id: ''
            }
            this.seasonData.splice(0, 0, objectName)
            
  
          } else {
            this.spinner.hide();
          }
        })
    }

    async team() {
      let data = {"apikey":"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
      "teams": this.leag_name,       
     }

      let Token: string = localStorage.getItem('userToken');
      const formData = new FormData();
      this.spinner.show();
      let league_name :string = this.seasonValue;
      let resultData
      (await this.adminService.get_team(league_name, Token)).subscribe(result => {
        resultData = result;
      },  
      (err) =>{ this.spinner.hide();
        if(err.status == 401){
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
        }
      },  
        () => {
          this.spinner.hide()
          this.teamData = resultData.data
          // if (resultData.status == "true") {
          //   this.spinner.hide();
          //   this.teamData = resultData.data
          //   let objectName = {
          //     teams: 'CHOOSE A TEAM',
          //     _id: ''
          //   }
          //   this.teamData.splice(0, 0, objectName);
          // } else {
          //   this.spinner.hide();
          // } 
        })
    }

    async opponent() {
      let Token: string = localStorage.getItem('userToken');
      this.spinner.show();
      let league_name :string = this.seasonValue;
      let resultData
      (await this.adminService.get_opponent(league_name, Token)).subscribe(result => {
        resultData = result;
      }, 
      (err) =>{ this.spinner.hide();
        if(err.status == 401){
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
        }
      }, 
        () => {
          this.spinner.hide()
          this.opponentData =resultData.data;
          // if (resultData.status == "true") {
          //   this.opponentData = resultData.data;
          //   this.spinner.hide(); 
          //   let objectName = {
          //     teams: 'CHOOSE OPPONENT',
          //     _id: ''
          //   }
          //   this.opponentData.splice(0, 0, objectName);
          // } else {
          //   this.spinner.hide();
          // }
        })
    }

    getHomeSeasonValue(event) {
      this.seasonValue = event.league_name;
      this.locate_disable =true;
      this.team();
      localStorage.setItem('SeasonName', this.seasonValue);
    }

    getAwaySeasonValue(event) {
      this.seasonValue = event.league_name;
      this.locate_disable =true;
      this.opponent();
      localStorage.setItem('SeasonName', this.seasonValue);
    }

    getTeamValue(event){
      this.teamValue = event.teams;
      this.locate_disable = true
      this.locate_disable =false;
      this.button_disable1 =false;
      this.button_dis_Away = false;   
      this.button_dis_Home = false;   
      localStorage.setItem('homeTeam', this.teamValue);
    }

    getOpponentValue(event){
      this.opponentValue = event.teams;
      // if( this.teamValue.length > 0){ 
      // this.locate_disable = false;
      // this.button_disable1 =false
      // }
      this.locate_disable = false;
      this.button_disable1 =false;
      this.button_dis_Away = false;   
      this.button_dis_Home = false;
      // localStorage.setItem('awayTeam', this.opponentValue);      
      localStorage.setItem('homeTeam', this.opponentValue);      
      
    }


    async playSingleGame_Initial() {    // Initial
      this.locate_disable =true
      // this.button_disable = false;
      let data = {"apikey"         :"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
                  "homeaway"       :"away",
                  "awayleague_name": this.model.season1.league_name,  
                  "homeleague_name": this.model.season.league_name,
                  "awayteam"       : this.model.opponent.teams,
                  "hometeam"       : this.model.team.teams,
                  }
      
      const Token: string = localStorage.getItem('userToken');
      // this.spinner.show();
      let resultdata;
      (await this.adminService.playGame_Single_One(data ,Token)).subscribe(result => {
        resultdata = result;
      },  
      (err) =>{ 
        // console.log(err)
        // this.spinner.hide();
        if(err.status == 401){
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
        }
      },
        () => {
          // this.spinner.hide();
          this.play_Single_Initial = resultdata;
          this.get_Single_Step()
        }
        );
    }

    async get_Single_Step() {    // Single Step
      this.button_disable =false;
      let data = {"apikey":"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
                  "options": this.option
                  }
      const Token: string = localStorage.getItem('userToken');
      // this.spinner.show();
      let resultdata:any;
      (await this.adminService.getPlay_Single_Step(data ,Token)).subscribe(result => {
        resultdata = result;
      },  
      (err) =>{ 
        // this.spinner.hide();
        if(err.status == 401){
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
        }
      },
        () => {
          // this.spinner.hide();
          this.getPlay_Single_Stp = resultdata
          if(this.count === "1"){
            // this.spinner.hide();
            this.playSingleGame_Stats()
            this.getComments()
            this.getRawBoxState()
            this.locate_disable =true
            this.button_disable =false
          }
          if(this.count === "2"){
            // this.spinner.hide();
            this.playSingleGame_Stats()
            this.getComments()
            this.getRawBoxState()
            this.locate_disable =true
            this.button_disable =false
          }
          if(this.count === "3"){
            if(this.getPlay_Single_Stp.continue === 'yes'){
              this.play_by_playComments = this.showableChatData
              this.get_Single_Step()
              this.playSingleGame_Stats()
                this.getComments()
                this.getRawBoxState()
              this.button_disable = true
            }else if(this.getPlay_Single_Stp.continue === 'no'){
              // this.spinner.hide();
              this.playSingleGame_Stats()
              this.getComments()
              this.getRawBoxState()
              // console.log("no run")
              this.locate_disable = true
              this.button_disable = false
            }else if(this.getPlay_Single_Stp.continue === 'gameover'){
              console.log("325 spineer run")
              this.button_disable = true  // conti
              this.locate_disable =false
              // this.spinner.hide();
            }
          }
          if(this.count === "4"){
          if(this.getPlay_Single_Stp.continue === 'yes' || this.getPlay_Single_Stp.continue === 'no'){
            // console.log("4 = yes")
            this.play_by_playComments = this.showableChatData
            this.playSingleGame_Stats()
            this.getComments()
            this.getRawBoxState()
            this.get_Single_Step()
          }else if(this.getPlay_Single_Stp.continue === 'gameover'){
            console.log("4 = gameover")
            // this.spinner.hide();
            this.button_disable = true
            this.locate_disable =false
          }         
        }
      });
    }

    async playSingleGame_Stats() {      // Stats
      this.button_disable = false;
      let data = {"apikey" : "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
                  }
      
      const Token: string = localStorage.getItem('userToken');
      // this.spinner.show();
      let resultdata;
      (await this.adminService.playGame_Single(data ,Token)).subscribe(result => {
        // console.log(result)
        resultdata = result;
      },  
    
      (err) =>{ 
        // this.spinner.hide();

        if(err.status == 401){
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
        }
      },
        () => {
          // this.spinner.hide();
          this.play_Single_Stats = resultdata.scoreboard;
          // console.log(this.play_Single_Stats.clock)
          if(this.count == '4'){
          // this.get_Single_Step()
          }
          if(this.count == '1'){
          // this.get_Single_Step()
          }
        }
        );
    }


    async getComments() {    
      let data = {"apikey":"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
                  "game_number":"ALL"
                  }      
      const Token: string = localStorage.getItem('userToken');
      // this.spinner.show();
      let resultdata;
      (await this.adminService.getComments(data ,Token)).subscribe(result => {
        resultdata = result;
      },      
      (err) =>{ 
        // this.spinner.hide();
        if(err.status == 401){
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
        }},() => {
            // this.spinner.hide();
            this.showableChatData = resultdata.data;
            let name=  this.showableChatData;
            var container = document.getElementById("fir");    
          container.scrollTop = container.scrollHeight;
            this.chatCount = Number(resultdata.data[0].color.trim());
            });
    }
    
    async getRawBoxState() {
      let data = {"apikey":"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
                  "game_number": "ALL"                  
                  }      
      const Token: string = localStorage.getItem('userToken');
      // this.spinner.show();
      let resultdata;
      (await this.adminService.rawBoxScore(data ,Token)).subscribe(result => {
        resultdata = result;
      }, 
      (err) =>{ 
        // this.spinner.hide();
        if(err.status == 401){
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
        }},() => {
          // this.spinner.hide();
          this.rawBoxScore = resultdata.data;
          var container = document.getElementById("scrollP");    
          container.scrollTop = container.scrollHeight; 
          // let name =this.rawBoxScore;
          //   if(name){
          //     jQuery('#scrollP').animate({
          //       scrollTop: jQuery("#yu").offset().top 
          //     }, 1000);
          // ``}
         });
          
    }

    after_Each_line(element){
      this.count = element
      // console.log(this.count)
    }
  
  continueChat(){  
    if( this.count === "1") {
      console.log(this.play_by_playComments)
      this.play_by_playComments.push(this.showableChatData[this.count_Single])
      console.log(this.play_by_playComments)
      this.count_Single ++

      let name = this.play_by_playComments;
      // if (name) {
      //   const yOffset = -20;
      //   jQuery('#fir').animate({
      //     scrollTop: jQuery("#sec").offset().top
      //   }, 2000);
      //   ``
      // }
      
      var container = document.getElementById("fir");    
      container.scrollTop = container.scrollHeight;
      if( this.count_Single == this.showableChatData.length){
        console.log(this.count_Single)
        this.get_Single_Step()
      }
    }

    // if( this.count === "1") {
    //   this.play_by_playComments.push(this.showableChatData[this.count_Single])
    //   this.count_Single ++
    //   if( this.count_Single == this.showableChatData.length){
    //     this.get_Single_Step()
    //   }
    // }

    else if( this.count === "2") {
      for(let i=0;i < this.showableChatData.length;i++){
      // console.log(Number(this.showableChatData[i].color.trim()),this.pushedDataLength,this.chatCount)
      if(this.pushedDataLength >= i && this.pushedDataLength <= this.showableChatData.length){
        if(Number(this.showableChatData[i].color.trim()) == this.chatCount){
          this.tempData.push(this.showableChatData[i])
          this.tempTeamData.push(this.showableChatData[i].color);
          this.play_by_playComments = this.tempData   
          // this.tempData ++     
          // this.showableChatData ++
          // console.log(this.tempData)
          this.pushedDataLength = this.tempData.length
          let name=  this.play_by_playComments;
          // if (name) {
          //   const yOffset = -20;
          //   jQuery('#fir').animate({
          //     scrollTop: jQuery("#sec").offset().top
          //   }, 2000);
          //   ``
          // }
          
          var container = document.getElementById("fir");    
          container.scrollTop = container.scrollHeight;
          if( this.tempData.length == this.showableChatData.length){
            console.log(this.tempData.length ,'==', this.showableChatData.length)
            this.get_Single_Step()
          }

        }}else{
          console.log(Number(this.showableChatData[i].color.trim()));
          this.chatCount = Number(this.showableChatData[i].color.trim());
          break;
        }
      }
    } 

   else if(this.count == "3" && this.getPlay_Single_Stp.continue == 'no'){
      console.log('11')
      this.get_Single_Step()
        this.playSingleGame_Stats()
          this.getComments()
          this.getRawBoxState()
      let name = this.play_by_playComments;
      // if (name) {
      //   const yOffset = -20;
      //   jQuery('#fir').animate({
      //     scrollTop: jQuery("#sec").offset().top
      //   }, 2000);
      //   ``
      // }
      
      var container = document.getElementById("fir");    
      container.scrollTop = container.scrollHeight;
      if(this.getPlay_Single_Stp.continue === 'yes'){
        this.play_by_playComments = this.showableChatData
        this.get_Single_Step()
        this.playSingleGame_Stats()
          this.getComments()
          this.getRawBoxState()
          this.continueChat()          
        console.log('22')
        this.button_disable = true
        let name=  this.play_by_playComments;
        // if (name) {
        //   const yOffset = -20;
        //   jQuery('#fir').animate({
        //     scrollTop: jQuery("#sec").offset().top
        //   }, 2000);
        //   ``
        // }
        // console.log("33")
        
        var container = document.getElementById("fir");    
        container.scrollTop = container.scrollHeight;
      }
      else if(this.getPlay_Single_Stp.continue === 'gameover'){
        console.log("run gameover")
        this.button_disable = true  // conti
        this.locate_disable =false
        this.spinner.hide();
      }
    }
  }

}
