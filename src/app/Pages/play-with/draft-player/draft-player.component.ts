import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Location} from '@angular/common'; 
import { AdminService } from 'src/services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router} from '@angular/router';

@Component({
  selector: 'app-draft-player',
  templateUrl: './draft-player.component.html',
  styleUrls: ['./draft-player.component.scss']
})
export class DraftPlayerComponent implements OnInit {
  @Input() fromParentDp;
  model: any = { data: '',
    'season': '',
    'opponent': '',
    'team':'',
    'gameNumber': ''

}
selectValue = { key: '',selectedKey: ''};
  playerData;
  gameData:any = [];
  oppGameData;
  team_name;
  opp_name;
  teamData: any = [];
  teamData1: any = [];
  teamValue: any;
  draftData:any;
  result: any;
  seasonData: any = [];
  seasonValue: any;
  draftTeam:any;
  draftTeamData:any;
  draftTeamA:any;        
  draftTeamB:any;
  selectedPlayer2:any;
  leag_name = '';
  isLocate = false;
  oneononeData;
  teamName= '';
  other_Name;
  dropTeam;
  thePlayer;
  oppTeam = [];
  multiCheckedValue:any=[];
  opponentValue:any;
  draftReplaceAddArr:any;
  assignedPlayer:any;
  playerToDraftData: any ;
  playerToDraftDataIndex:any;
  playerToReplaceData: any;
  newTeamName: string;
  selectedPlayer:any;
  leftHandSideSelected:boolean=false;
  selectedPlayerName: string = '';
  selectedDraftPlayerName: string = '';
  replacing : any ;
  draftDataMain: any = [];
  league_value:any
  league_valuee:any
  team1:any =[];
  allTheTeams;
  selectedOpTeam:any;

  @Output('toggleMenu') toggleMenu: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private notifierService: NotifierService,
    public activeModal: NgbActiveModal,
    private _location: Location,
  ) {
    this.selectedOpTeam = localStorage.getItem('PredictData2');
    this.allTheTeams = localStorage.getItem('showStatus');
    this.draftTeam = localStorage.getItem('PredictData1')
    this.draftTeamA = localStorage.getItem('SeasonName')
    this.draftReplaceAddArr = []


    this.oneononeData = localStorage.getItem('showStatus');
    if (this.oneononeData != 'allteam' && this.oneononeData == 'oneonone') {
      this.leag_name = localStorage.getItem('SeasonName');
      if(localStorage.getItem('gameData') && localStorage.getItem('gameData') != ''){
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
    } else {
      let team = JSON.parse(localStorage.getItem('allTeamData'))
      this.teamName = this.gameData[0]
      this.team_name = this.teamName;
      this.leag_name = localStorage.getItem('SeasonName');
    }
  }

  selectDropdown: any = [
    { label: 'SELECT LEAUGES', value: '', },
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
    if(!localStorage.getItem('userToken')){
      this.router.navigateByUrl('/');
    }
    this.season() 

    let league_name =  localStorage.getItem('SeasonName');

    this.team_name = this.gameData[0];
    
     this.team(league_name)
    this.getPlayerDraftonLoad(this.draftTeam);
 

  }
  
  closeModalDraft(sendData) {
    this.activeModal.close(sendData);
  }

  backClicked() {                  
    this._location.back();
  }

  async setPlayerDraft() {
    if (this.draftReplaceAddArr.length > 0) {
      let  data :  any = {
        "apikey":"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A", 
        "league_name":localStorage.getItem('SeasonName'),
        "team_name": this.draftTeam,
        "data":this.draftReplaceAddArr
      };
                                
      const Token: string = localStorage.getItem('userToken');
      this.spinner.show();
      let resultdata;
      (await this.adminService.setDraft(data ,Token)).subscribe(result => {
        resultdata = result;
      }, // (err) => console.log(err),

      (err) =>{ this.spinner.hide();
        if(err.status == 401){
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
        }
      },

        () => {
          this.spinner.hide();
          if (resultdata.status === 'true' || resultdata.status === true) {
            this.draftReplaceAddArr = []
            this.notifierService.notify('success', "Draft Player Update Sucessfully");
            // this.notifierService.notify('success', "Draft Player Sucessfully");
            this.backClicked();
           } else {
            this.notifierService.notify('error', resultdata.message);
          }
        });
    } else {
      alert('you must have at least one player add or replace');
    }
    
  }

  


  async getPlayerDraft(e) {
     
    let  data :  any = {
    "apikey":"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
     "keeppbp":"N",
     "league_name": this.league_value,
     "team_name":e
    }

    const Token: string = localStorage.getItem('userToken');
    this.spinner.show();
    let resultdata;
    (await this.adminService.getDraft(data ,Token)).subscribe(result => {
      resultdata = result;

    }, //(err) => console.log(err),
    (err) =>{ this.spinner.hide();
      if(err.status == 401){
        localStorage.clear();
        this.router.navigateByUrl('/');
        this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
      }
    },


      () => {
        this.spinner.hide();
        if (resultdata.status === 'true' || resultdata.status === true) {
          this.draftData = resultdata.data;
          
        } else {
          this.notifierService.notify('error', resultdata.message);
        }
      });
  }
  async getPlayerDraftonLoad(e) {
     
    let  data :  any = {
    "apikey":"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
     "keeppbp":"N",
     "league_name":localStorage.getItem('SeasonName'),
     "team_name":e
    }

    const Token: string = localStorage.getItem('userToken');
    this.spinner.show();
    let resultdata;
    (await this.adminService.getDraft(data ,Token)).subscribe(result => {
      resultdata = result;
    },   //(err) => console.log(err),
 
    (err) =>{ this.spinner.hide();
      if(err.status == 401){
        localStorage.clear();
        this.router.navigateByUrl('/');
        this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
      }
    },

    () => {
      this.spinner.hide();
      if (resultdata.status === 'true' || resultdata.status === true) {
        this.draftTeamData = resultdata.data;
        
      } else {
        this.notifierService.notify('error', resultdata.message);
      }
    });
  }


  async team(k) {
    let Token: string = localStorage.getItem('userToken');
    this.spinner.show();
    // let league_name :string = this.seasonValue;
    let league_name :string = k;
    
    (await this.adminService.get_team(league_name, Token)).subscribe(result => {
      this.result = result;
    },  // (err) => console.log(err),

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
          this.teamData = this.result.data
          
          let objectName = {
            _id: ''
          }
          this.teamData.splice(0, 0, objectName);
        } else {
          this.spinner.hide();
        }
      })
  }



  async teamm(k) {
    let Token: string = localStorage.getItem('userToken');
    this.spinner.show();
    // let league_name :string = this.seasonValue;
    let league_name :string = k;
    
    (await this.adminService.get_team(league_name, Token)).subscribe(result => {
      this.result = result;
    },  // (err) => console.log(err),

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
          this.teamData1 = this.result.data
          
          let objectName = {
            _id: ''
          }
          this.teamData1.splice(0, 0, objectName);
        } else {
          this.spinner.hide();
        }
      })
  }

  seasson_arry:any

  async season() {
    let Token: string = localStorage.getItem('userToken');
    this.spinner.show();
    (await this.adminService.get_season(Token)).subscribe(result => {
      this.result = result;
    },   //(err) => console.log(err),
 
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
            // league_name: 'SELECT LEAGUES',
            _id: ''
          }
          this.seasonData.splice(0, 0, objectName)
          this.seasson_arry=this.seasonData
          

        } else {
          this.spinner.hide();
        }
      })
  }

  getSeasonValue(event) {
    this.seasonValue = event.league_name;
    // this.team()
  }
 
  playertodraft(e) {
    this.newTeamName = e.teams
    this.teamData1.map(value => {
      value.activeRow = false
    })
    e.activeRow = true
    this.getPlayerDraft(e.teams)
  }


  draftTeamPlayerData(e,i) {
    this.playerToDraftDataIndex = i;
    this.playerToDraftData = e.player_name
    this.draftTeamData.map(value => {
      value.activeRow = false
    })
    e.activeRow = true;
    this.selectedDraftPlayerName = e.player_name;
  }
  
  draftTeamReplace(e){
    // console.log('abc',e);
    let data = {
      height: e.height,
      orig_team_code: e.orig_team_code,
      orig_year: e.orig_year,
      player_name: e.player_name,
      positions: e.positions
    }
    this.playerToReplaceData = data  //e.player_name
    this.draftData.map(value => {
      value.activeRow = false
    })
    e.activeRow = true;
    this.selectedPlayerName = e.player_name;
  }
  
  replace(){
    if (this.selectedPlayerName === '' || this.selectedDraftPlayerName === '') {
      alert('You must have a player selected in the both list boxes.');
    } else {
      if (this.draftTeamData[this.playerToDraftDataIndex].player_name !== this.playerToReplaceData.player_name || this.draftTeamData[this.playerToDraftDataIndex].height !== this.playerToReplaceData.height || this.draftTeamData[this.playerToDraftDataIndex].orig_team_code !== this.playerToReplaceData.orig_team_code || this.draftTeamData[this.playerToDraftDataIndex].orig_year !== this.playerToReplaceData.orig_year) {
        this.draftTeamData[this.playerToDraftDataIndex] = this.playerToReplaceData;
        let newadd = {
          "action":"replace",
          "original_player":this.playerToDraftData,
          "new_player_league":this.seasonValue,
          "new_player_team":this.newTeamName,
          "new_player_name":this.playerToReplaceData.player_name
        }
        this.draftReplaceAddArr.push(newadd)
      }
    }
   

  }
  add(){
      this.draftTeamData.push(this.playerToReplaceData  );
      let newadd = {
        "action":"add",
        "new_player_league":this.seasonValue,
        "new_player_team":this.newTeamName,
        "new_player_name":this.playerToReplaceData.player_name
      }
      this.draftReplaceAddArr.push(newadd)
    
    
  }
  // add(){
  //   if (this.selectedDraftPlayerName === '') {
  //     // alert('You must have a player selected.');
  //   } else {
  //     this.draftTeamData.push(this.playerToReplaceData  );
  //     let newadd = {
  //       "action":"add",
  //       "new_player_league":this.seasonValue,
  //       "new_player_team":this.newTeamName,
  //       "new_player_name":this.playerToReplaceData.player_name
  //     }
  //     this.draftReplaceAddArr.push(newadd)
  //   }
    
  // }

  cancelClicked() {
    this.draftReplaceAddArr = [];
    // this.draftTeam = [];
    this.getPlayerDraftonLoad(this.draftTeam);
  }

  changeTeam(event) {
    this.draftTeam = event.target.value
    let league_name = localStorage.getItem('SeasonName');
    let data = {
      "apikey": "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
      "keeppbp": "N",
      "league_name": league_name,
      "team_name": this.team_name,
      "opp_name": this.opp_name,
    }
    this.getPlayerDraftonLoad(this.draftTeam);
  }

  
  session_list(k) {
    this.seasson_arry.map(item => {
      item.activeRow = false
    })
    this.league_value = k.league_name
    k.activeRow = true
    // this.team(this.league_value)
    this.teamm(this.league_value)
   }

}
