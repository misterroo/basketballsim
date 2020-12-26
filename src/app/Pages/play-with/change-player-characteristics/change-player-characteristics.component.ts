import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../../../services/admin.service';
import { NotifierService } from 'angular-notifier';
import * as $ from 'jquery';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-change-player-characteristics',
  templateUrl: './change-player-characteristics.component.html',
  styleUrls: ['./change-player-characteristics.component.scss']
})
export class ChangePlayerCharacteristicsComponent implements OnInit {
  model: any = { data: '' }
  playerData;
  selectedItem = { key: '', selectedKey: '' };
  team_name;
  gameData: any = [];
  show: any;
  leag_name = '';

  display: boolean = false;
  teamData: any;
  teamResult: any;
  teamName = '';
  oppTeamName = '';
  other_Name;
  draftTeam: any;
  gameStatus = '';
  activeCell: boolean;
  playerDataOld: any = [];
  @Output('toggleMenu') toggleMenu: EventEmitter<any> = new EventEmitter();

  constructor(
    //  private toastr: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private notifierService: NotifierService,
    private _location: Location,
  ) {
    this.activeCell = false;
    this.playerDataOld = [];
    this.gameStatus = localStorage.getItem('showStatus');
    this.leag_name = localStorage.getItem('SeasonName');
    if (this.gameStatus === 'playallteam') {
      this.draftTeam = localStorage.getItem('PredictData1');
      this.gameData.push(this.draftTeam);

    } else if (this.gameStatus === 'oneonone') {
      this.draftTeam = localStorage.getItem('PredictData1');

      if (localStorage.getItem('gameData') && localStorage.getItem('gameData') != '') {
        this.gameData = JSON.parse(localStorage.getItem('gameData'));
      }
      if (localStorage.getItem('Predictgames') != "") {
        this.other_Name = JSON.parse(localStorage.getItem('Predictgames'));
        this.gameData = this.other_Name
      }
      let obj = []
      for (let item of this.gameData) {
        obj.push(item.predictaway)
        obj.push(item.predicthome)
      }
      this.gameData = [...new Set(obj)]
    } else if (this.gameStatus === 'allteam') {
      let team = JSON.parse(localStorage.getItem('allTeamData'))
      for (let item of team) {
        this.gameData.push(item.teams)
      }
      this.teamName = this.gameData[0]
      this.team_name = this.teamName;
    }

  }


  selectDropdown: any = [
    { label: 'SELECT/SORT OPTIONS', value: '', },
    { label: 'LIMIT', value: '' },
    { label: 'SELECT PLAYERS', value: '' },
    { label: 'SORT', value: '' },
    { label: 'SELECT TEAM', value: '' }
  ];
  sortdropdown: any = [
    { label: 'NONE', value: '' },
    { label: 'Option1', value: '' },
    { label: 'Option2', value: '' },
    { label: 'Option3', value: '' }
  ]
  val1: string = 'Option 1';
  val2: string = 'Option 1';
  val3: string = 'Option 1';
  val4: string = 'Option 1';
  val5: string = 'Option 1';
  selectedValue: any
  display0: boolean = false;
  display1: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  display4: boolean = false;

  showDialog0() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
  }
  showDialog1() {
    this.display0 = false;
    this.display1 = true;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
  }
  showDialog2() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = true;
    this.display3 = false;
    this.display4 = false;
  }
  showDialog3() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = true;
    this.display4 = false;
    this.val1 = 'Option 1';
    this.val2 = 'Option 1';
    this.val3 = 'Option 1';
    this.val4 = 'Option 1';
    this.val5 = 'Option 1';
  }
  showDialog4() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = true;
  }

  ngOnInit(): void {
    if (!localStorage.getItem('userToken')) {
      this.router.navigateByUrl('/');
    }
    // console.log('this.gameData', this.gameData)

    let league_name = localStorage.getItem('SeasonName');
    this.team_name = this.gameData[0];
    let data = {
      "apikey": "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
      "keeppbp": "N",
      "league_name": league_name,
      "team_name": this.team_name
    }
    this.getPlayerCharacteristics(data);
    // console.log('kkkkkk')

  }


  closed(): void {
    this.toggleMenu.emit();
  }

  async getPlayerCharacteristics(data) {
    const Token: string = localStorage.getItem('userToken');
    this.spinner.show();
    let resultdata;
    (await this.adminService.getCharacteristics(data, Token)).subscribe(result => {
      resultdata = result;

    }, (err) => {
      this.spinner.hide();
      if (err.status == 401) {
        localStorage.clear();
        this.router.navigateByUrl('/');
        this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
      }
    },

      () => {
        this.spinner.hide();
        if (resultdata.status === 'true' || resultdata.status === true) {
          this.playerData = resultdata.data;
          this.playerDataOld = resultdata.data;
        } else {
          this.notifierService.notify('error', resultdata.message);
        }
      });

  }


  async setPlayerCharacteristics() {

    let data: any = {
      apikey: "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
      "league_name": localStorage.getItem('SeasonName'),
      "team_name": this.team_name,
      data: this.playerData
    };

    const Token: string = localStorage.getItem('userToken');
    this.spinner.show();
    let resultdata;
    (await this.adminService.setCharacteristics(data, Token)).subscribe(result => {
      resultdata = result;

    }, // (err) => console.log('errorSou',err),
      (err) => {
        this.spinner.hide();
        if (err.status == 401) {
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.showToaster();
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
        }
      },

      () => {
        this.spinner.hide();
        if (resultdata.status === 'true' || resultdata.status === true) {
          this.notifierService.notify('success', 'Update successfully');
        } else {
          this.notifierService.notify('error', resultdata.message);
        }
      });
  }




  openMode() {
    document.getElementById('change-model').click();

    this.display = true;

  }



  showToaster() {
    // this.toastr.success("Hello, I'm the toastr message.")
  }
  openModel(key, selectedkey, index) {
    // console.log(key);
    // console.log(selectedkey);
    // console.log(index);
    this.selectedItem.key = key;
    this.selectedItem.selectedKey = selectedkey;
    this.selectedItem['value'] = this.playerData[index][selectedkey];
    this.selectedItem['index'] = index;

    // this.show = '';
    this.onChangePlayer()
  }

  onChangePlayer() {
    if (this.selectedItem.key == 'POSS FACT') {
      this.show = "Possession Factor(touches/min): -100% to 500%"
      if (this.selectedItem.key == 'POSS FACT' && (parseFloat(this.selectedItem['value']) >= -100.0 && parseFloat(this.selectedItem['value']) <= 500.00)) {

        this.display = false;
        this.playerData[this.selectedItem['index']][this.selectedItem.selectedKey] = this.selectedItem['value'];

      } else { alert("Possession Factor(touches/min): -100% to 500%") }

    } else if (this.selectedItem.key == '2PT FG%') {
      this.show = "2PT Field Goal %: 18.5% - 68.5%"
      if (this.selectedItem.key == '2PT FG%' && (parseFloat(this.selectedItem['value']) >= 18.5 && parseFloat(this.selectedItem['value']) <= 68.5)) {

        this.display = false;
        this.playerData[this.selectedItem['index']][this.selectedItem.selectedKey] = this.selectedItem['value'];
      } else { alert("2PT Field Goal %: 18.5% - 68.5%") }

    } else if (this.selectedItem.key == '3PT FG%') {
      this.show = "3PT Field Goal %: 18.5% - 68.5%"
      if (this.selectedItem.key == '3PT FG%' && (parseFloat(this.selectedItem['value']) >= 18.5 && parseFloat(this.selectedItem['value']) <= 68.5)) {

        this.display = false;
        this.playerData[this.selectedItem['index']][this.selectedItem.selectedKey] = this.selectedItem['value'];
      } else {
        alert("3PT Field Goal %: 18.5% - 68.5%")
      }

    } else if (this.selectedItem.key == 'FT%') {
      this.show = "Free Throw %: 0.0% - 100.0%"
      if (this.selectedItem.key == 'FT%' && (parseFloat(this.selectedItem['value']) >= 0.0 && parseFloat(this.selectedItem['value']) <= 100.0)) {

        this.display = false;
        this.playerData[this.selectedItem['index']][this.selectedItem.selectedKey] = this.selectedItem['value'];
      } else {
        alert("Free Throw %: 0.0% - 100.0%")
      }

    }
    else if (this.selectedItem.key == '%SHOT') {
      this.show = " % Shot: 10.0 to 70.0"
      if (this.selectedItem.key == '%SHOT' && (parseFloat(this.selectedItem['value']) >= 10.0 && parseFloat(this.selectedItem['value']) <= 70.0)) {

        this.display = false;
        this.playerData[this.selectedItem['index']][this.selectedItem.selectedKey] = this.selectedItem['value'];
      }
      else {
        alert(" % Shot: 10.0 - 70.0")
      }
    }


    else if (this.selectedItem.key == '3PT %SHOT') {
      this.show = "%3PT Shot: 0.0 to 34.30"

      if (this.selectedItem.key == '3PT %SHOT' && (parseFloat(this.selectedItem['value']) >= 0.0 && parseFloat(this.selectedItem['value']) <= 34.30)) {

        this.display = false;
        this.playerData[this.selectedItem['index']][this.selectedItem.selectedKey] = this.selectedItem['value'];
      } else {
        alert("%3PT Shot: 0.0 to 34.30")
      }

    }


    else if (this.selectedItem.key == '% FOULED') {
      this.show = "% FOULED: 2.0 to 25.0"

      if (this.selectedItem.key == '% FOULED' && (parseFloat(this.selectedItem['value']) >= 2.0 && parseFloat(this.selectedItem['value']) <= 25.0)) {

        this.display = false;
        this.playerData[this.selectedItem['index']][this.selectedItem.selectedKey] = this.selectedItem['value'];
      } else {
        alert("% FOULED: 2.0 to 25.0")
      }

    }


    else if (this.selectedItem.key == '%TO') {
      this.show = "% TO 3.5 to 20.0"

      if (this.selectedItem.key == '%TO' && (parseFloat(this.selectedItem['value']) >= 3.5 && parseFloat(this.selectedItem['value']) <= 20.0)) {

        this.display = false;
        this.playerData[this.selectedItem['index']][this.selectedItem.selectedKey] = this.selectedItem['value'];
      } else {
        alert("% TO 3.5 to 20.0")
      }

    }
    else if (this.selectedItem.key == '%PASS') {
      this.show = " "
    }
    else if (this.selectedItem.key == 'OFF REB') {
      this.show = "Offensive Rebounding Rating: 0.0 to 30.0"


      if (this.selectedItem.key == 'OFF REB' && (parseFloat(this.selectedItem['value']) >= 0.0 && parseFloat(this.selectedItem['value']) <= 30.0)) {

        this.display = false;
        this.playerData[this.selectedItem['index']][this.selectedItem.selectedKey] = this.selectedItem['value'];
      }
      else {
        alert("Offensive Rebounding Rating: 0.0 to 30.0")
      }

    }
    else if (this.selectedItem.key == 'DEF REB') {
      this.show = "Defensive Rebounding Rating: 0.0 to 30.0"

      if (this.selectedItem.key == 'DEF REB' && (parseFloat(this.selectedItem['value']) >= 0.0 && parseFloat(this.selectedItem['value']) <= 30.0)) {

        this.display = false;
        this.playerData[this.selectedItem['index']][this.selectedItem.selectedKey] = this.selectedItem['value'];
      }
      else {
        alert("Defensive Rebounding Rating: 0.0 to 30.0")
      }

    }
    else if (this.selectedItem.key == 'DEF FG%') {
      this.show = "Individual Player Defense: -5.0 % to 5.0 %"
      if (this.selectedItem.key == 'DEF FG%' && (parseFloat(this.selectedItem['value']) >= -5.0 && parseFloat(this.selectedItem['value']) <= 5.0)) {

        this.display = false;
        this.playerData[this.selectedItem['index']][this.selectedItem.selectedKey] = this.selectedItem['value'];
      }
      else {
        alert("Individual Player Defense: -5.0 % to 5.0 %")
      }
    }
    else if (this.selectedItem.key == '%PF') {
      this.show = "Personal foul Rating(PF/MIN): 3.0 to 19.0"
      if (this.selectedItem.key == '%PF' && (parseFloat(this.selectedItem['value']) >= 3.0 && parseFloat(this.selectedItem['value']) <= 19.0)) {

        this.display = false;
        this.playerData[this.selectedItem['index']][this.selectedItem.selectedKey] = this.selectedItem['value'];
      }
      else {
        alert("Personal foul Rating(PF/MIN): 3.0 to 19.0")
      }

    }
    else if (this.selectedItem.key == '%ST') {
      this.show = "Steal Rating: 0.0 to 15.0"
      if (this.selectedItem.key == '%ST' && (parseFloat(this.selectedItem['value']) >= 0.0 && parseFloat(this.selectedItem['value']) <= 15.0)) {

        this.display = false;
        this.playerData[this.selectedItem['index']][this.selectedItem.selectedKey] = this.selectedItem['value'];
      }
      else {
        alert("Steal Rating: 0.0 to 15.0")
      }

    }
    else if (this.selectedItem.key == '%BS') {
      this.show = "Blocked Shot Rating: 0.0 to 15.0"
      if (this.selectedItem.key == '%BS' && (parseFloat(this.selectedItem['value']) >= 0.0 && parseFloat(this.selectedItem['value']) <= 15.0)) {

        this.display = false;
        this.playerData[this.selectedItem['index']][this.selectedItem.selectedKey] = this.selectedItem['value'];
      }
      else {
        alert("Blocked Shot Rating: 0.0 to 15.0")
      }
    }
    // else if (this.selectedItem.key == 'DENY FACT' && (parseFloat(this.selectedItem['value']) <= -100 || parseFloat(this.selectedItem['value']) >= 300)) {
    //   this.show = "Ball Deny Factor: -100 to 300"
    // }

    else if (this.selectedItem.key == 'DENY FACT') {
      this.show = "Ball Deny Factor: -100 to 300"
      if (this.selectedItem.key == 'DENY FACT' && (parseFloat(this.selectedItem['value']) >= -100 && parseFloat(this.selectedItem['value']) <= 300)) {

        this.display = false;
        this.playerData[this.selectedItem['index']][this.selectedItem.selectedKey] = this.selectedItem['value'];
      }
      else {
        alert("Ball Deny Factor: -100 to 300")
      }
    }

  }

  cloaseChangeModel() {
    this.display = false;
    this.selectedItem = { key: '', selectedKey: '' };
  }

  closeChangeModel() {
    this.selectedItem = { key: '', selectedKey: '' };
    this.display = false;

  }

  changeTeam(event) {

    this.team_name = event.target.value;

    let league_name = localStorage.getItem('SeasonName');
    let data = {
      "apikey": "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
      "keeppbp": "N",
      "league_name": league_name,
      "team_name": this.team_name
    }
    this.getPlayerCharacteristics(data);
  }

  backClicked() {                   // 167, 18, 5
    this._location.back();
  }

  reset() {
    let league_name = localStorage.getItem('SeasonName');
    let data = {
      "apikey": "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
      "keeppbp": "N",
      "league_name": league_name,
      "team_name": this.team_name
    }
    this.getPlayerCharacteristics(data);
  }





  changePlayerSelectlist: any = [       // array of object   // validation
    { label: 'YEAR', value: 'year', },
    { label: 'TM', value: 'team_code' },
    { label: 'PLAYER NAME', value: 'name' },
    { label: 'POS', value: 'position' },
    { label: 'POSS FACT', value: 'poss_fact' },
    { label: '2PT FG%', value: 'two_pt_fg_pct' },
    { label: '3PT FG%', value: 'three_pt_fg_pct' },
    { label: 'FT%', value: 'ft_pct' },
    { label: '%SHOT', value: 'pct_shot' },
    { label: '3PT %SHOT', value: 'three_pt_pct_shot' },
    { label: '% FOULED', value: 'pct_fouled' },
    { label: '%TO', value: 'pct_to' },
    { label: '%PASS', value: 'pct_pass' },
    { label: 'OFF REB', value: 'off_reb' },
    { label: 'DEF REB', value: 'def_reb' },
    { label: 'DEF FG%', value: 'def_fg_pct' },
    { label: '%PF', value: 'pct_pf' },
    { label: '%ST', value: 'pct_st' },
    { label: '%BS', value: 'pct_bs' },
    { label: 'DENY FACT', value: 'poss_fact' },
  ];



}