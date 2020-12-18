import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from "angular-notifier";
import {Location} from '@angular/common';

import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-play-with-all-teams',
  templateUrl: './play-with-all-teams.component.html',
  styleUrls: ['./play-with-all-teams.component.scss']
})
export class PlayWithAllTeamsComponent implements OnInit {
  model: any = {
    'season': '',
    'opponent': '',
    'team':'',
    'gameNumber': ''
  }
  enableDisableStatus: any;
  showDisable: boolean;
  showDisableSecond: boolean;
  result: any;
  teamData: any = [];
  seasonData: any = [];
  opponentData: any = [];
  // teamDropdown: any = [
  //   { label: 'CHOOSE A TEAM', value: '' },
  //   { label: 'Option1', value: '' },
  //   { label: 'Option2', value: '' },
  //   { label: 'Option3', value: '' }
  // ];
  // opponentDropdown: any = [
  //   { label: 'CHOOSE OPPONENT', value: '' },
  //   { label: 'Option1', value: '' },
  //   { label: 'Option2', value: '' },
  //   { label: 'Option3', value: '' }
  // ];
  // seasonDropdown: any = [
  //   { label: 'CHOOSE A SEASON', value: '' },
  //   { label: 'Option1', value: '' },
  //   { label: 'Option2', value: '' },
  //   { label: 'Option3', value: '' }
  // ];
  seasonValue: any;
  teamValue: any;
  opponentValue: any;
  constructor(
    private notifierService: NotifierService,
    private router: Router,
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
  ) {
    this.showDisable = false;
    this.showDisableSecond = false;
    this.enableDisableStatus = localStorage.getItem('showStatus');
    if (this.enableDisableStatus === "allteam") {
      this.showDisable = true;
      this.showDisableSecond = true;

    }
    if (this.enableDisableStatus === "oneonone") {
      this.showDisable = false;
      this.showDisableSecond = false;
    }
    if (this.enableDisableStatus === "playallteam") {
      this.showDisable = true;
      this.showDisableSecond = false;
    }
   
  }

  ngOnInit(): void {
    if(!localStorage.getItem('userToken')){
      this.router.navigateByUrl('/');
    }

    this.season();

    localStorage.setItem('tableData','')
    localStorage.setItem('tableDataAllteam','')
    localStorage.setItem('tableDataAll','')
    localStorage.setItem('PredictData2', this.opponentValue)
    
    localStorage.setItem('Predictgames', ''); //// play multiple games
    localStorage.setItem('simType', '') // home,away,both,neutral
    // localStorage.setItem('event','') //range slider
    localStorage.setItem('eventrange','') //range slider
    localStorage.setItem('isShow', ''); // advance seeting

  }
  
  goto() {
    this.router.navigate(['/dashboard3/advancedsettingqtrtable']);
  }

  async team() {
    let Token: string = localStorage.getItem('userToken');
    // const formData = new FormData();
    this.spinner.show();
    let league_name :string = this.seasonValue;
    (await this.adminService.get_team(league_name, Token)).subscribe(result => {
      this.result = result;
    }, // (err) => console.log(err),

    (err) =>{ this.spinner.hide();
      if(err.status == 401){
        localStorage.clear();
        this.router.navigateByUrl('/');
        this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
      }
    },



      () => {
        // console.log('result', this.result)

        if (this.result.status == "true") {
          this.spinner.hide();
          this.teamData = this.result.data
          let objectName = {
            teams: 'CHOOSE A TEAM',
            _id: ''
          }
          this.teamData.splice(0, 0, objectName);
        } else {
          this.spinner.hide();
        }
      })
  }

  async season() {
    let Token: string = localStorage.getItem('userToken');
    // const formData = new FormData();
    this.spinner.show();
    (await this.adminService.get_season(Token)).subscribe(result => {
      this.result = result;
    }, // (err) => console.log(err),

    (err) =>{ this.spinner.hide();
      if(err.status == 401){
        localStorage.clear();
        this.router.navigateByUrl('/');
        this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
      }
    },


      () => {

        if (this.result.status == "true") {
          this.spinner.hide();
          this.seasonData = this.result.data

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

  async opponent() {
    let Token: string = localStorage.getItem('userToken');
    // const formData = new FormData();
    this.spinner.show();
    let league_name :string = this.seasonValue;
    (await this.adminService.get_opponent(league_name, Token)).subscribe(result => {
      this.result = result;
    }, // (err) => console.log(err),

    (err) =>{ this.spinner.hide();
      if(err.status == 401){
        localStorage.clear();
        this.router.navigateByUrl('/');
        this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
      }
    },


      () => {
        // console.log('result', this.result)

        if (this.result.status == "true") {
          this.opponentData = this.result.data;
          this.spinner.hide();

          let objectName = {
            teams: 'CHOOSE OPPONENT',
            _id: ''
          }
          this.opponentData.splice(0, 0, objectName);
        } else {
          this.spinner.hide();
        }
      })
  }

  backClicked() {               
    this._location.back();
  }



  getSeasonValue(event) {
    this.seasonValue = event.league_name;
    localStorage.setItem('SeasonName', this.seasonValue);

    this.team();
    this.opponent();
  }
  getTeamValue(event){
     this.teamValue = event.teams;
     localStorage.setItem('PredictData1', this.teamValue);
  }
  getOpponentValue(event){
     this.opponentValue = event.teams;
     localStorage.setItem('PredictData2', this.opponentValue);
  }
  getGameNumberValue(event){
    localStorage.setItem('gameNumber', event);
  }
}
