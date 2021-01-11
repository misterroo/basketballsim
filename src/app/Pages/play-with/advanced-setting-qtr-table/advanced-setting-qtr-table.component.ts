import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { Options } from 'ng5-slider';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../../../services/admin.service';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NotifierService } from "angular-notifier";
import { SharedService } from '../../../services/shared.service';
import {TabViewModule} from 'primeng/tabview';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubstitutionPatternComponent } from '../substitution-pattern/substitution-pattern.component';
import { DraftPlayerComponent } from '../draft-player/draft-player.component';
import { ChangePlayerCharacteristicsComponent } from '../change-player-characteristics/change-player-characteristics.component';
@Component({
  selector: 'app-advanced-setting-qtr-table',
  templateUrl: './advanced-setting-qtr-table.component.html',
  styleUrls: ['./advanced-setting-qtr-table.component.scss']
})
export class AdvancedSettingQtrTableComponent implements OnInit {
  model = {
    'slidervalue': ''
  }


  showDisable: boolean;
  showDisableSecond: boolean;
  position: string
  selectedCities: string[] = [];
  pbpChecked: boolean = false;
  clicked: boolean = false;
  val1: number;
  enableDisableStatus: any;
  // value: number = 3;
  // options: Options = {
  //   showTicksValues: true,
  //   stepsArray: [
  //     { value: 1 },
  //     { value: 2, legend: 'SEMI ACCURATE' },
  //     { value: 3 },
  //   ],
  // };
  options: Options = {
    showTicksValues: true,
    floor: 0,
    ceil: 100,
    stepsArray: [
      { value: 1 },
      { value: 2, legend: 'SEMI ACCURATE' },
      { value: 3 },
    ]
  };
  sliderValue: number = 0;
  
  allArrayData: any = [];
  getTableData: any = [];

  localT: any = [];

  result: any;
  teamResult: any;
  resultData: any;
  pridictData = {}
  selectedValue: string;
  selectedTeamName: string;
  selectedApponentName: string;
  selectedRange: string;
  seasonName: string;
  showTable: boolean;
  showModal: boolean = false;

  showPlayMultiple: boolean = false;
  showSubstitution: boolean = false;
  showCharacter: boolean = false;
  showDraft: boolean = false;
  draftTeam:any;
  draftTeamA:any;        
  gameset : any;
  playGamesMulti: any;
  seasonValue: any;
  teamData: any = [];
  teamValue: any;
  gameTotalvalue = 0;
  gameArray: any;
  gameArrayy: any;
  oneononeDataa;
  allTheTeams;

  gameList: any;
  showIndex: string;
  isShow: boolean = false;

  // @Output('closed') closed: EventEmitter<any> = new EventEmitter();

  // quickForm: boolean = true;
  // advancedForm: boolean = false;
  // playMultipleForm: boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private notifierService: NotifierService,
    private shared: SharedService,
    private modalService: NgbModal,
  ) {
    this.getTableData = [];
    let checkPlaybyPlay = localStorage.getItem('keyy');
    if (checkPlaybyPlay === null) {
      localStorage.setItem('keyy', 'false')
    } else {
      if (checkPlaybyPlay === 'true') {
        this.pbpChecked = true;
      } else {
        this.pbpChecked = false;
      }
    }
    this.draftTeam = localStorage.getItem('PredictData1') 
      this.draftTeamA = localStorage.getItem('SeasonName')
    this.oneononeDataa = localStorage.getItem('showStatus');
    this.allTheTeams = localStorage.getItem('showStatus');
    // console.log("oneonone",this.oneononeDataa)



    this.showDisable = false;
    this.showDisableSecond = false;
    this.enableDisableStatus = localStorage.getItem('showStatus');
    if (this.enableDisableStatus === "allteam") {
      this.showDisable = true;
      this.showDisableSecond = true;

    }
    this.seasonName = localStorage.getItem('SeasonName');
    this.selectedTeamName = localStorage.getItem('PredictData1');
    this.selectedApponentName = localStorage.getItem('PredictData2');
    if(this.enableDisableStatus == 'oneonone') {
      this.selectedRange = localStorage.getItem('gameNumber');

    }
    if(this.enableDisableStatus == 'playallteam') {
      this.showIndex = 'normal';
    }

    
    this.showTable = false;
    
    this.gameList = [];
    this.playGamesMulti = [
      {
        "predictaway": { teams: this.selectedTeamName },
        "predictgames": this.selectedRange,
        "predicthome": { teams: this.selectedApponentName },
      },
      {
        "predictaway": "",
        "predictgames": "",
        "predicthome": "",
      },
      {
        "predictaway": "",
        "predictgames": "",
        "predicthome": "",
      },
      {
        "predictaway": "",
        "predictgames": "",
        "predicthome": "",
      },
      {
        "predictaway": "",
        "predictgames": "",
        "predicthome": "",
      },
      {
        "predictaway": "",
        "predictgames": "",
        "predicthome": "",
      },
      {
        "predictaway": "",
        "predictgames": "",
        "predicthome": "",
      },
      {
        "predictaway": "",
        "predictgames": "",
        "predicthome": "",
      },
      {
        "predictaway": "",
        "predictgames": "",
        "predicthome": "",
      },
      {
        "predictaway": "",
        "predictgames": "",
        "predicthome": "",
      },
      {
        "predictaway": "",
        "predictgames": "",
        "predicthome": "",
      },
      {
        "predictaway": "",
        "predictgames": "",
        "predicthome": "",
      },
      {
        "predictaway": "",
        "predictgames": "",
        "predicthome": "",
      },
      {
        "predictaway": "",
        "predictgames": "",
        "predicthome": "",
      },
      {
        "predictaway": "",
        "predictgames": "",
        "predicthome": "",
      }
    ]; 
    // console.log("jjj",localStorage.getItem('Predictgames'))
    if(localStorage.getItem('Predictgames')){
      let d = JSON.parse(localStorage.getItem('Predictgames'));
      for(let i=0;i<d.length;i++){
        for(let j=0;j<this.playGamesMulti.length;j++){
          this.playGamesMulti[i].predictaway = { teams: d[i].predictaway  }
          this.playGamesMulti[i].predicthome = { teams: d[i].predicthome  }
          this.playGamesMulti[i].predictgames = d[i].predictgames  
        }
      }
    }
    
    let gameArrayData = [];
    gameArrayData.push({
      "predictaway": this.selectedTeamName,
      "predictgames": this.selectedRange,
      "predicthome": this.selectedApponentName,
    })

    this.gameArray = gameArrayData;

    if(this.enableDisableStatus == 'oneonone') {
      localStorage.setItem('gameData',JSON.stringify(this.gameArray));
      localStorage.setItem('gameOppData',JSON.stringify(this.gameArrayy));
    }
  }

  ngOnInit(): void {
    localStorage.setItem('homeTeam', '')
    // localStorage.setItem('keyy','false')
    if(localStorage.getItem('simType')){
      this.selectedCities = [localStorage.getItem('simType')];
    }
    else if (this.enableDisableStatus === "oneonone") {
      this.selectedCities = ['AWAY'];
    }
    if(localStorage.getItem('isShow')){
      if(localStorage.getItem('isShow')== 'true'){
        this.isShow = true
      }else{
        this.isShow = false
      }
      // localStorage.clear()
    }
    this.team()
    this.totalCount()
    // console.log(this.pridictData,"Data*")
    // console.log(this.model.slidervalue,"range")
    // $(document).ready(function () {
    //   $(".range_circle").click(
    //     function () {
    //       $(this).removeClass(".ng5-slider-active");
    //       console.log("*")
    //     }
    //   );
    // });
    // this.tableData();
    
    if(localStorage.getItem('eventrange') != ''){
      this.localT = JSON.parse(localStorage.getItem('eventrange'))
    }

    
    // if(localStorage.getItem('tableData') != ''){
      
    //   this.getTableData = JSON.parse(localStorage.getItem('tableData'))
    //   this.showTable = true;
      
    // }
  }

  playbtn(e){
    let pbpStatus = e.target.checked;
    console.log(pbpStatus)
    localStorage.setItem('keyy', pbpStatus.toString())
    this.pbpChecked = e.target.checked;
  }



  onChange(status) {
    // console.log(status);
    localStorage.setItem('simType',status)
    if (status === 'HOME') {
      this.selectedCities = ['HOME'];
    } else if (status === 'AWAY') {
      this.selectedCities = ['AWAY'];
    } else if (status === 'BOTH') {
      this.selectedCities = ['BOTH'];
    } else if (status === 'NEUTRAL') {
      this.selectedCities = ['NEUTRAL'];
    }
    // const latestCity = this.selectedCities[this.selectedCities.length - 1];
    // this.selectedCities.length = 0;
    // this.selectedCities.push(latestCity);
    // for(let value of this.selectedCities){
    //     this.selectedValue = value
    // }
    // console.log(this.selectedValue,"**")
    // this.tableData();
    
  }
  showAdvance(status) {
    this.isShow = status;
    if(this.isShow){
      localStorage.setItem('isShow','true')
    }else{
      localStorage.setItem('isShow','false')
    }
    
    
  }

  toggleMenu(): void{
    this.showCharacter    = false;
    this.showSubstitution = false;
    this.showDraft        = false;
  }

  tableAdd() {
    // $(document).ready(function () {
    //   $("#table").toggle();
    // });
    this.showTable = true;
    this.showModal = true

    // this.tableData();
    if(this.enableDisableStatus == 'oneonone') {
      this.tableData();

    }
    if(this.enableDisableStatus == 'playallteam') {
      this.tableDataAllteam();
    }
    if (this.enableDisableStatus === "allteam") {
      this.tableDataAll();
    }

  }





  rangeslider(event) {
    localStorage.setItem('eventrange',JSON.stringify(event))
    // console.log(event, "range")
    if (event === 1) {
      this.showIndex = 'normal';
    }  else if (event === 2) {
      this.showIndex = '10';
    }  else if (event === 3) {
      this.showIndex = '100';
    }
    
  }

  async tableData() {
    // const formData = new FormData();
    // let gameArr = this.gameArray;
    // let arrData = {
    //   predictaway: this.selectedTeamName,
    //   predicthome: this.selectedApponentName,
    //   predictgames: this.selectedRange.toString()
    // }
    // gameArr.push(arrData);
    let keeppbpYN = 'Y';
    if (this.pbpChecked === false) {
      keeppbpYN = 'Y';
      localStorage.setItem('keeppbpYN', 'false')
    } else {
      keeppbpYN = 'N';
      localStorage.setItem('keeppbpYN', 'true')

    }
    if (this.gameArray.length > 0) {
      let homeWay = this.selectedCities.join();
      this.pridictData = {
        "apikey": "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
        "keeppbp": keeppbpYN,
        "league_name": this.seasonName,
        "gamemode": "predict",
        "homeaway": homeWay.toLocaleLowerCase(),
        "numgames": "normal",
        "gamearray": this.gameArray
      }
      let Token: string = localStorage.getItem('userToken');
      this.spinner.show();
      
      (await this.adminService.QtrTable(this.pridictData, Token)).subscribe(result => {
        this.result = result;
      }, 

      (err) =>{ //this.spinner.hide();
        if(err.status == 401){
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
        }
      },



        () => {
          
          if (this.result.status === "true" || this.result.status === true) {
            
            this.getGames()
          } else {
            this.spinner.hide();
          }
        })
    } else {
      this.notifierService.notify("info", "Please choose atleast one TEAM, GAME number and OPPONENT ");
    }
    
  }
  
  async getGames() {
    let Token: string = localStorage.getItem('userToken');
    this.spinner.hide();
    (await this.adminService.withoutQtrTable(Token)).subscribe(result => {
      
  
      this.resultData = result
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
        
        if (this.resultData.status === "true") {
          this.spinner.hide();
          this.getTableData = this.resultData.data;
          // localStorage.setItem('tableData',JSON.stringify(this.getTableData))
          this.getGames()

        } else {
          // this.spinner.hide();
        }
      })
  }

  async team() {
    let Token: string = localStorage.getItem('userToken');
    this.spinner.show();
    let league_name: string = localStorage.getItem('SeasonName');
    (await this.adminService.get_team(league_name, Token)).subscribe(result => {
      this.teamResult = result;
    }, 

    (err) =>{ this.spinner.hide();
      if(err.status == 401){
        localStorage.clear();
        this.router.navigateByUrl('/');
        this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
      }
    },


      () => {

        if (this.teamResult.status == "true") {
          this.spinner.hide();
          this.teamData = this.teamResult.data;
          localStorage.setItem('allTeamData',JSON.stringify(this.teamData))
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
  getTeamValue(event) {
    this.teamValue = event.teams;
    localStorage.setItem('PredictData1', this.teamValue);
  }

  saveMulti() {
    let gameArrayNew = [];
    for (let item of this.gameList) {
      if (item.predictaway !== '' && item.predictgames !== '' && item.predicthome !== '') {
        gameArrayNew.push({
          "predictaway": item.predictaway.teams,
          "predictgames": item.predictgames,
          "predicthome": item.predicthome.teams
        })
      }
    }
    this.gameArray = gameArrayNew;
    localStorage.setItem('Predictgames', JSON.stringify(this.gameArray));
    // console.log(this.gameArray, "gameTest")

    this.showPlayMultiple = false;
  }

  totalCount() {
    this.gameTotalvalue = 0;
    for (let valueTotal of this.gameList) {
      if (valueTotal.predictgames != '') {
        this.gameTotalvalue += parseInt(valueTotal.predictgames)
      }
    }
  }



  showbuttonModalDialog() {
    this.gameList = this.playGamesMulti;
    this.showPlayMultiple = true;
  }

  showbuttonModalDialogS() {
    const modalRef = this.modalService.open(SubstitutionPatternComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        size: 'lg'
        // keyboard: false,
        // backdrop: 'static'
      });
  }

  showbuttonModalDialogC() {
    const modalRef = this.modalService.open(ChangePlayerCharacteristicsComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        size: 'lg'
        // keyboard: false,
        // backdrop: 'static'
      });
  }
  showbuttonModalDialogD() {
    const modalRef = this.modalService.open(DraftPlayerComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        size: 'lg'
        // keyboard: false,
        // backdrop: 'static'
      });
  }

  cancelMulti() {
    this.showPlayMultiple = false;
    
  }
  
  resetMulti() {
    for (let item of this.gameList) {
      item.predictaway =  '',
      item.predictgames = '',
      item.predicthome =  ''
    }
  }

  goto(url) {
    // if(url != 'substitutionpattern' && url != 'draftplayer' 
    // && url != 'changeplayercharacteristics'  && this.getTableData.length == 0) {
    
    //   this.notifierService.notify("info", "Please run  simulation first");
    //   return false;
    // }
    this.router.navigate(['/' +url]);
    if(this.enableDisableStatus == 'oneonone') {
      localStorage.setItem('gameData',JSON.stringify(this.gameArray));
      localStorage.setItem('gameOppData',JSON.stringify(this.gameArrayy));
    }
    if(this.enableDisableStatus == 'playallteam') {
      let x  = 82;
      if (this.showIndex == 'normal') {
        x = 82
      }  else if ( this.showIndex == '10') {
        x = 82 *10
      }  else if (this.showIndex == '100') {
        x = 82 *100
      }
      this.gameArray[0]['predictgames'] = x;
      localStorage.setItem('gameData',JSON.stringify(this.gameArray));
    }
    if (this.enableDisableStatus === "allteam") {
    }
    this.shared.setPlaybyPlayData(this.getTableData);
  }

  async tableDataAllteam() {
    // const formData = new FormData();
    let keeppbpYN = 'Y';
    if (this.pbpChecked === false) {
      keeppbpYN = 'Y';
      localStorage.setItem('keeppbpYN', 'false');
    } else {
      keeppbpYN = 'N';
      localStorage.setItem('keeppbpYN', 'true');
    }

    let Token: string = localStorage.getItem('userToken');
    let request: any = {"apikey":"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
      "keeppbp": keeppbpYN,
      "league_name": localStorage.getItem('SeasonName'),
      "gamemode": '8200',
      "homeaway":"home",
      "numgames": this.showIndex ? this.showIndex : 'normal' ,
      "hometeam": localStorage.getItem('PredictData1'),
   }
    this.spinner.show();
    (await this.adminService.gameListSeasonTeam(request, Token)).subscribe(result => {
      // localStorage.setItem('tableDataAllteam',JSON.stringify(this.pridictData))
      
      this.result = result;
    }, 

    (err) =>{ this.spinner.hide();
      if(err.status == 401){
        localStorage.clear();
        this.router.navigateByUrl('/');
        this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
      }
    },



      () => {
        if (this.result.status === 'true') {
          this.spinner.hide();
          // this.getTableData = this.result.data;
          this.tableDataAllData();
        } else {
          this.spinner.hide();
        }
      })
  }
  async tableDataAll() {
    // const formData = new FormData();
    let keeppbpYN = 'Y';
    if (this.pbpChecked === false) {
      keeppbpYN = 'Y';
      localStorage.setItem('keeppbpYN', 'false');
    } else {
      keeppbpYN = 'N';
      localStorage.setItem('keeppbpYN', 'true');
    }

    let Token: string = localStorage.getItem('userToken');
    let request: any = {"apikey":"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
      "keeppbp": keeppbpYN,
      "league_name": localStorage.getItem('SeasonName'),
      "gamemode": 'fullseason',
      "homeaway":"home",
      "numgames":"normal",
   }
    this.spinner.show();
    (await this.adminService.gameListFullSeason(request, Token)).subscribe(result => {
      // localStorage.setItem('tableDataAll',JSON.stringify(this.pridictData))
      this.result = result;
    }, 

    (err) =>{ this.spinner.hide();
      if(err.status == 401){
        localStorage.clear();
        this.router.navigateByUrl('/');
        this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
      }
    },


      () => {
        if (this.result.status === 'true') {
          this.spinner.hide();
          // this.getTableData = this.result.data;
          this.tableDataAllData();
        } else {
          this.spinner.hide();
        }
      })
  }
  async tableDataAllData() {
    // const formData = new FormData();
    let Token: string = localStorage.getItem('userToken');
    // this.spinner.show();
    (await this.adminService.withoutQtrTable(Token)).subscribe(result => {
      this.result = result;
    }, 

    (err) =>{ this.spinner.hide();
      if(err.status == 401){
        localStorage.clear();
        this.router.navigateByUrl('/');
        this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
      }
    },


      () => {
        if (this.result.status === 'true') {
          this.spinner.hide();
          // this.getTableData = this.result.data;
          this.getTableData = this.result.data;
          // this.tableDataAllData();
          
          setTimeout(() => {
            this.tableDataAllData();
          }, 1000)
          // localStorage.setItem('tableData',JSON.stringify(this.getTableData))
        } else {
          this.spinner.hide();
        }
      })
  }

 
}
