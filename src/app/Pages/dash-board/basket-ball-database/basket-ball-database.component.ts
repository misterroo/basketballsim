import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../../../services/admin.service';
import { NotifierService } from 'angular-notifier';
import { Router} from '@angular/router';
import {DialogModule} from 'primeng/dialog';
import { Header, LazyLoadEvent } from 'primeng/api';
import { PipeTransform, Pipe } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';
import * as $ from 'jquery';
import { element } from 'protractor';
@Component({
  selector: 'app-basket-ball-database',
  templateUrl: './basket-ball-database.component.html',
  styleUrls: ['./basket-ball-database.component.scss']
})
export class BasketBallDatabaseComponent implements OnInit {
  databaseGamePlay: string = '';
  footerData: any;
  footerDataTeam: any;
  totalPlayerTeamCount: number;
  recordLength: number = 0;
  getDatabaseStatistics: any[] = [];
  model: any = { data: '' }
  scrollableCols: any =[];
  frozenCols: any[];
  databaseData: any = [];
  databaseTeamData: any = [];
  allData: any = [];
  allTeamData: any = [];
  database_Team: any = [];
  database_Player: any = [];
  playerSelectAllPosition:boolean=false
  playerSelectSinglePosition:boolean=false
  playerSelectPlayer:boolean=false
  playerSelectLeague:boolean=false
  playerSelectYear:boolean=false
  playerSelectTeam:boolean=false
  database_Year: any = [];
  database_League: any = [];
  playerDataSort:any = [];
  playerPositionDataAllSort:any = [];
  playerPositionDataAllSortData:any = [];
  playerPositionDataSingleSort:any = [];
  playerPositionDataSingleSortAll:any = [];
  playerTeam:any=[];
  playerYear:any=[];
  playerLeague:any=[];
  selectedPlayerName:any =[];
  selectedName:any =[];
  selectedPositionAl:any =[];
  selectedPositionSingle:any =[];
  selectRow:any =[];
  selectedTeamName:any =[];
  selectedYearName:any =[];
  selectedPositionName:any =[];
  selectedLeagueName:any =[];
  selectedPlayerPly:any =[];
  selectedPlayerReg:any =[];
  sortPlayerId:any;
  sortPositionAllId:any;
  sortPositionAllId1:any;
  sortPositionSingleId:any;
  sortPlaPositionId:any;
  unhideClick:any;
  unhideClick1:any;
  sortRowId:any;
  sortTeamId:any;
  sortYearId:any;
  sortLeagueId:any;
  fieldModel:any = {};
  fieldModelReg:any = {};
  addHeader:any = {};
  addBody:any = {};
  findData:any = -1;
  finValue:any;
  radiofieldModel:any = {
    sort1a: 'true',
    sort2a: 'true',
    sort3a: 'true',
    sort4a: 'true',
  }
  radioPlayer:any = {
    radionPlayer: 'true'
  }
  selectedCheck:any = {
    check: 'ok'
  }
  firSetColor:any = "blue"
  secSetColor:any = "red"
  firSetColorOn:any = "blue"
  secSetColorOn:any = "red"
  columnHideIndex:number;
  columnCalculateIndex:number;
  unhideClickId:number;
  clickAttribute:number;
  takeValue:number;
  takeValue1:any = "";
  takeplayerTeamCode:any;
  asenItem: any;
  asenItemPlayer: any;
  asenItemTeam: any;
  asenItemPosition: any;
  asenItemYear: any;
  asenItemLeague: any;
  startPoint:number=1;
  startPointTeam:number=1;
  lengthPoint:number=50;
  lengthPointTeam:number=50;
  hideData:any = [];
  firstData:any = [];
  playerName: any = [];
  teamName: any = [];
  yearName: any = [];
  leagueName: any = [];
  lowLimit:any = null; 
  lowLimit1:any = 'no'; 
  field_Name_Input:any =""; 
  field_Name_Title:any =""; 
  temp:any =""; 
  highLimit:any =null;
  limit1:any =null;
  selectHeader:any =null;
  chooseColumn:any =null;
  selectBody:any =null;
  sort1a:any =null;
  sort1:any =null;
  sort2a:any =null;
  sort2:any =null;
  sort3a:any =null;
  sort3:any =null;
  sort4a:any =null;
  sort4:any =null;
  filter1:any =null;
  radionPlayer =null;
  coloroption:any ="teamname";
  coloroption1:any ="player";
  regply:any ='';
  symbols : any = [];
  subtotal:any = null;
  locate_disable:boolean=true
  locate_disablee:boolean=true
  // supportsPassive:boolean = false;

  tempData:any = [];
  tempTeamData:any = []

  desItem: any;
  sorty:any ={item:''}
  sortingItem: any;
  sortingPositionItem: any;
  currentSortOrder: any;
  currentSortValue: any;
  currentSortValuePlayer: any;
  currentSortValueYear: any;
  currentSortValueLeague: any;
  currentSortValueTeam: any;
  currentSortValuePositionAll: any;
  currentSortOrderPlayer: any;
  currentSortOrderYear: any;
  currentSortOrderTeam: any;
  currentSortOrderPosititonAll: any;
  currentSortOrderLeague: any;
  columnPosition:number;
  columnOriginalPosition:number;
  columnHide:number;
  columnList:number;
  fieldModel1:any ={item:''}
  fieldModel2:any ={item:''}
  fieldModel3:any ={item:''}
  fieldModel4:any ={item:''}
  fieldModel5:any ={item:'yes'}
  fieldModel6:any ={item:'no'}
  fieldModelPlayer:any ={item:'Ascending'}
  fieldModelTeam:any ={item:'Ascending'}
  fieldModelPostionAll:any ={item:'Ascending'}
  fieldModelYear:any ={item:'Ascending'}
  fieldModelLeague:any ={item:'Ascending'}
  selectlisthe:any;
  limitModelMin:any = {min:'',max:''}
  parentNode:any = [];
  getTableData: any = [];
   playerToData:any;
   findInput:any = {data:''};
   findInput1:any = "no";

   wheelOpt:any;
   wheelEvent:any;

   allyellow: boolean = false;
   all_Color: boolean = false;

  display: boolean = false;
  val1: string = 'Option 1';
  val2: string = 'Option 1';
  val3: string = 'Option 1';
  val4: string = 'Option 1';
  val5: string = 'Option 1';
  selectedValue: any;
  display0: boolean = false;
  display1: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  display4: boolean = false;
  display5: boolean = false;
  display6: boolean = false;
  display7: boolean = false;
  display8: boolean = false;
  display9: boolean = false;
  display10: boolean = false;
  display11: boolean = false;
  display12: boolean = false;
  display13: boolean = false;
  display14: boolean = false;
  display15: boolean = false;
  displayModal: boolean = false;
  displayModal1: boolean = false;

  selectedRows: any = [];
  selectedRow: any = [];
  constructor(
    private router: Router,
    private _location: Location,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private notifierService: NotifierService
  ) { 
    this.totalPlayerTeamCount = 0;
    this.databaseGamePlay = '';
    this.databaseData = [];
   }

  showDialog0() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
    this.display5 = false;
    this.display6 = false;
    this.display7 = false;
    this.display8 = false;
    this.display9 = false;
    this.display10 = false;
    this.display11 = false;
    this.display12 = false;
    this.display13 = false;
    this.display14 = false;
  }
  showDialog1() {
    console.log('select year')
    this.display0 = false;
    this.display1 = true;
    if(this.databaseData && this.databaseData.length > 0){
      this.Year_Data()
    } else if(this.databaseTeamData && this.databaseTeamData.length > 0){
      this.Team_Year_Data()
    }
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
    this.display5 = false;
    this.display6 = false;
    this.display7 = false;
    this.display8 = false;
    this.display9 = false;
    this.display10 = false;
    this.display11 = false;
    this.display12 = false;
    this.display13 = false;
    this.display14 = false;
  }
  showDialog2() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = true;
    this.Player_Data()
    this.display3 = false;
    this.display4 = false;
    this.display5 = false;
    this.display6 = false;
    this.display7 = false;
    this.display8 = false;
    this.display9 = false;
    this.display10 = false;
    this.display11 = false;
    this.display12 = false;
    this.display13 = false;
    this.display14 = false;
  }
  showDialog3() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = true;
    if(this.databaseData && this.databaseData.length > 0){
      this.League_Data()
    } else if(this.databaseTeamData && this.databaseTeamData.length > 0){
      this.Team_League_Data()
    }
    this.display4 = false;
    this.val1 = 'Option 1';
    this.val2 = 'Option 1';
    this.val3 = 'Option 1';
    this.val4 = 'Option 1';
    this.val5 = 'Option 1';
    this.display5 = false;
    this.display6 = false;
    this.display7 = false;
    this.display8 = false;
    this.display9 = false;
    this.display10 = false;
    this.display11 = false;
    this.display12 = false;
    this.display13 = false;
    this.display14 = false;
  }
  showDialog4() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = true;
    if(this.databaseData && this.databaseData.length > 0){
      this.team_Data()
    } else if(this.databaseTeamData && this.databaseTeamData.length > 0){
      this.Team_Team_Data()
    }
    this.display5 = false;
    this.display6 = false;
    this.display7 = false;
    this.display8 = false;
    this.display9 = false;
    this.display10 = false;
    this.display11 = false;
    this.display12 = false;
    this.display13 = false;
    this.display14 = false;
  }
  showDialog5() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
    this.display5 = true;
    this.display6 = false;
    this.display7 = false;
    this.display8 = false;
    this.display9 = false;
    this.display10 = false;
    this.display11 = false;
    this.display12 = true;
    this.display13 = false;
    this.display14 = false;
  }
  showDialog6() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
    this.display5 = false;
    this.display6 = true;
    this.display7 = false;
    this.display8 = false;
    this.display9 = false;
    this.display10 = false;
    this.display11 = false;
    this.display12 = false;
    this.display13 = false;
    this.display14 = false;
  }
  showDialog7() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
    this.display5 = false;
    this.display6 = false;
    this.display7 = true;
    this.display8 = false;
    this.display9 = false;
    this.display10 = false;
    this.display11 = false;
    this.display12 = false;
    this.display13 = false;
    this.display14 = false;
  }
  showDialog8() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
    this.display5 = false;
    this.display6 = false;
    this.display7 = false;
    this.display8 = true;
    this.display9 = false;
    this.display10 = false;
    this.display11 = false;
    this.display12 = false;
    this.display13 = false;
    this.display14 = false;
  }
  showDialog9() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
    this.display5 = false;
    this.display6 = false;
    this.display7 = false;
    this.display8 = false;
    this.display9 = true;
    this.display10 = false;
    this.display11 = false;
    this.display12 = false;
    this.display13 = false;
    this.display14 = false;
  }
  showDialog10() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
    this.display5 = false;
    this.display6 = false;
    this.display7 = false;
    this.display8 = false;
    this.display9 = false;
    this.display10 = true;
    this.display11 = false;
    this.display12 = false;
    this.display13 = false;
    this.display14 = false;
  }
  showDialog11() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
    this.display5 = false;
    this.display6 = false;
    this.display7 = false;
    this.display8 = false;
    this.display9 = false;
    this.display10 = false;
    this.display11 = true;
    this.display12 = false;
    this.display13 = false;
    this.display14 = false;
  }
  showDialog12() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
    this.display5 = false;
    this.display6 = false;
    this.display7 = false;
    this.display8 = false;
    this.display9 = false;
    this.display10 = false;
    this.display11 = false;
    this.display12 = true;
    this.display13 = false;
    this.display14 = false;
  }
  showDialog13() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
    this.display5 = false;
    this.display6 = false;
    this.display7 = false;
    this.display8 = false;
    this.display9 = false;
    this.display10 = false;
    this.display11 = false;
    this.display13 = true;
    this.display12 = false;
    this.display14 = false;
  }
  showDialog14() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
    this.display5 = false;
    this.display6 = false;
    this.display7 = false;
    this.display8 = false;
    this.display9 = false;
    this.display10 = false;
    this.display11 = false;
    this.display14 = true;
    this.display12 = false;
    this.display13 = false;
  }
  showDialog15() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
    this.display5 = false;
    this.display6 = false;
    this.display7 = false;
    this.display8 = false;
    this.display9 = false;
    this.display10 = false;
    this.display11 = false;
    this.display15 = true;
    this.display12 = false;
    this.display13 = false;
  }
  showModalDialog() {
    this.displayModal = true;
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
    this.display5 = false;
    this.display6 = false;
    this.display7= false;
    this.display8= false;
    this.display9 = false;
    this.display10 = false;
    this.display11 = false;
    this.display12 = false;
    this.display13 = false;
    this.display14 = false;
    this.display15 = false;
  }  
  showModalDialog1() {
    this.displayModal1 = true;
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
    this.display5 = false;
    this.display6 = false;
    this.display7= false;
    this.display8= false;
    this.display9 = false;
    this.display10 = false;
    this.display11 = false;
    this.display12 = false;
    this.display13 = false;
    this.display14 = false;
    this.display15 = false;
  }  



  ngOnInit(): void {
    // this.Team_League_Data()
    // this.Team_Team_Data()
    // this.Team_Year_Data()
    // this.team_Data()
    setTimeout(() => {
      this.GetScrollerEndPoint();
    }, 500)
  }


  getData(event) {
    this.selectedValue = event.label
    if (this.selectedValue == 'SELECT YEAR') {
      this.showDialog1();
    }
    if (this.selectedValue == 'SELECT PLAYERS') {
      this.showDialog2();
    }
    if (this.selectedValue == 'SELECT LEAGUE') {
      this.showDialog3();
    }
    if (this.selectedValue == 'SELECT TEAM') {
      this.showDialog4();
    }
    if (this.selectedValue == 'SELECT REG') {
      this.showDialog5();
    }
    if (this.selectedValue == 'SELECT PLY') {
      this.showDialog6();
    }
    if (this.selectedValue == 'SORT') {
      this.showDialog7();
    }
    if (this.selectedValue == 'LIMIT') {
      this.showDialog8();
    }
    if (this.selectedValue == 'SELECT POSITION ALL') {
      this.showDialog9();
    }
    if (this.selectedValue == 'SELECT POSITION SINGLE') {
      this.showDialog10();
    }
    if (this.selectedValue == 'UNHIDE COLUMNS') {
      this.showDialog11();
    }
    if (this.selectedValue == 'CUSTOM CALCULATED COLUMNS') {
      this.showDialog12();
    }
    if (this.selectedValue == 'Column Positions') {
      this.showDialog13();
    }
    if (this.selectedValue == 'Column Positions') {
      this.showDialog14();
    }
  }

  getStaticsDatabasePlayer() {
    this.databaseGamePlay = 'playerMode';
    this.resetData()
    this.getStaticsDatabase();
  }
  getStaticsDatabaseTeamData() {
    this.databaseGamePlay = 'teamMode';
    this.resetData()
    this.getStaticsDatabaseTeam();
  }
  setColorChange() {
    if (this.databaseGamePlay === 'playerMode') {
      let firstColor = this.firSetColorOn;
      let secondColor = this.secSetColorOn;
      for (let i = 0; i < this.databaseData.length; i++) {
        if (i === 0) {
          this.databaseData[i].setcolor = firstColor;
        }
        if (i > 0) {
          if (this.radioPlayer.radionPlayer === 'true') {
            if (this.databaseData[i].teamname ===  this.databaseData[i-1].teamname) {
              this.databaseData[i].setcolor = firstColor;
            } else {
              
              this.databaseData[i].setcolor = secondColor;
              let secColor = firstColor;
              firstColor = secondColor;
              secondColor = secColor;
            }
          } else if (this.radioPlayer.radionPlayer === 'b') {
            if (this.databaseData[i].teamname ===  this.databaseData[i-1].teamname) {
              this.databaseData[i].setcolor = firstColor;
            } else {
              
              this.databaseData[i].setcolor = secondColor;
              let secColor = firstColor;
              firstColor = secondColor;
              secondColor = secColor;
            }
          } else if (this.radioPlayer.radionPlayer === 'c') {
            if (this.databaseData[i].year1 === this.databaseData[i-1].year1) {
              this.databaseData[i].setcolor = firstColor;
            } else {
              this.databaseData[i].setcolor = secondColor;
              let secColor = firstColor;
              firstColor = secondColor;
              secondColor = secColor;
            }
          } else if (this.radioPlayer.radionPlayer === 'c') {
            if (this.databaseData[i].year1 ===  this.databaseData[i-1].year1) {
              this.databaseData[i].setcolor = firstColor;
            } else {
              
              this.databaseData[i].setcolor = secondColor;
              let secColor = firstColor;
              firstColor = secondColor;
              secondColor = secColor;
            }
          } else if (this.radioPlayer.radionPlayer === 'd') {
            if (this.databaseData[i].league ===  this.databaseData[i-1].league) {
              this.databaseData[i].setcolor = firstColor;
            } else {
              
              this.databaseData[i].setcolor = secondColor;
              let secColor = firstColor;
              firstColor = secondColor;
              secondColor = secColor;
            }
          } else if (this.radioPlayer.radionPlayer === 'e') {
            if (this.databaseData[i].playoffs ===  this.databaseData[i-1].playoffs) {
              this.databaseData[i].setcolor = firstColor;
            } else {
              
              this.databaseData[i].setcolor = secondColor;
              let secColor = firstColor;
              firstColor = secondColor;
              secondColor = secColor;
            }
          } else if (this.radioPlayer.radionPlayer === 'e') {
            if (this.databaseData[i].div1 ===  this.databaseData[i-1].div1) {
              this.databaseData[i].setcolor = firstColor;
            } else {
              
              this.databaseData[i].setcolor = secondColor;
              let secColor = firstColor;
              firstColor = secondColor;
              secondColor = secColor;
            }
          }
        }
        
        // this.radioPlayer.radionPlayer
      }
    } else if (this.databaseGamePlay === 'teamMode') {
      let firstColor = this.firSetColorOn;
      let secondColor = this.secSetColorOn;
      for (let i = 0; i < this.databaseTeamData.length; i++) {
        if (i === 0) {
          this.databaseTeamData[i].setcolor = firstColor;
        }
        if (i > 0) {
          if (this.radioPlayer.radionPlayer === 'true') {
            if (this.databaseTeamData[i].teamname ===  this.databaseTeamData[i-1].teamname) {
              this.databaseTeamData[i].setcolor = firstColor;
            } else {
              
              this.databaseTeamData[i].setcolor = secondColor;
              let secColor = firstColor;
              firstColor = secondColor;
              secondColor = secColor;
            }
          } else if (this.radioPlayer.radionPlayer === 'c') {
            if (this.databaseTeamData[i].year1 === this.databaseTeamData[i-1].year1) {
              this.databaseTeamData[i].setcolor = firstColor;
            } else {
              this.databaseTeamData[i].setcolor = secondColor;
              let secColor = firstColor;
              firstColor = secondColor;
              secondColor = secColor;
            }
          } else if (this.radioPlayer.radionPlayer === 'd') {
            if (this.databaseTeamData[i].league ===  this.databaseTeamData[i-1].league) {
              this.databaseTeamData[i].setcolor = firstColor;
            } else {
              
              this.databaseTeamData[i].setcolor = secondColor;
              let secColor = firstColor;
              firstColor = secondColor;
              secondColor = secColor;
            }
          } else if (this.radioPlayer.radionPlayer === 'e') {
            if (this.databaseTeamData[i].playoffs ===  this.databaseTeamData[i-1].playoffs) {
              this.databaseTeamData[i].setcolor = firstColor;
            } else {
              
              this.databaseTeamData[i].setcolor = secondColor;
              let secColor = firstColor;
              firstColor = secondColor;
              secondColor = secColor;
            }
          } else if (this.radioPlayer.radionPlayer === 'e') {
            if (this.databaseTeamData[i].div1 ===  this.databaseTeamData[i-1].div1) {
              this.databaseTeamData[i].setcolor = firstColor;
            } else {
              
              this.databaseTeamData[i].setcolor = secondColor;
              let secColor = firstColor;
              firstColor = secondColor;
              secondColor = secColor;
            }
          }
        }
        
        // this.radioPlayer.radionPlayer
      }
    }
    
  }
  async getStaticsDatabase() {
    // this.firSetColorOn = "blue";
    // this.secSetColorOn = "red";
    this.locate_disable = false
    this.locate_disablee = false
    // this.all_Color = false
    this.databaseTeamData = []
    let data = {
      "apikey": "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
      "start": this.startPoint,
      "length": this.lengthPoint,
      "players": this.playerName.length > 0 ? this.playerName : null,
      "years": this.yearName.length > 0 ? this.yearName : null,
      "teams": this.teamName.length > 0 ? this.teamName : null,
      "leagues": this.leagueName.length > 0 ? this.leagueName : null,
      "filter1": this.filter1,
      "coloroption": this.coloroption1,
      "subtotal": this.subtotal,
    };
    let i = 1;
    for (const [key, val] of Object.entries(this.fieldModel)) {
      data['sort' + i] = val['value'];
      i++;
    }
    let j = 1;
    for (const [key, val] of Object.entries(this.radiofieldModel)) {
      data['sort' + j + 'a'] = val;
      j++;
    }

    if (this.regply !== '') {
      data['regply'] = this.regply
    }

    if (this.limit1 !== null) {
      data['limit1'] = this.limit1;
      data['lowlimit'] = this.lowLimit;
      data['highlimit'] = this.highLimit;
    }

    // if (this.fieldModel.sort1 !== null) {
    //   data['sort1'] = this.fieldModel.sort1.value;
    //  data['sort1a'] = this.sort1a;
    // }
    // if (this.fieldModel.sort2 !== null) {
    //    data['sort2'] = this.fieldModel.sort2.value;
    //   data['sort2a'] = this.sort2a;
    // }
    // if (this.fieldModel.sort3 !== null) {
    //    data['sort3'] = this.fieldModel.sort3.value;
    //   data['sort3a'] = this.sort3a;
    // }
    // if (this.fieldModel.sort4 !== null) {
    //    data['sort4'] = this.fieldModel.sort4.value;
    //   data['sort4a'] = this.sort4a;
    // }


    this.spinner.show();
    let resultdata;
    (await this.adminService.getDatabase(data)).subscribe(result => {

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
        if (resultdata !== null) {
          this.scrollableCols = [];
          this.frozenCols = [];
          this.allData = resultdata.headers;
          this.footerData = resultdata.totals;
          // this.allData.push(this.addHeader)
          for (let header of this.allData) {
            for (let footer of this.footerData) {
              if (header.field_name === footer.field_name) {
                header.value = footer.value;
              }
            }
          }
          if (resultdata.PlayerData !== null) {
            this.databaseData = this.databaseData.concat(resultdata.PlayerData);
            if (this.all_Color == true) {
              this.selectedRows = this.databaseData;
            }
          }
          this.totalPlayerTeamCount = resultdata.recordsTotal;
          
          this.setColorChange();
          this.databaseData.map((item, index) => { // For All Position
            if (index > 0) {
              this.playerPositionDataAllSort.push(item.position)
              this.playerPositionDataAllSort.sort((a, b) => a < b ? -1 : 1);
              this.playerPositionDataAllSort = [...new Set(this.playerPositionDataAllSort)]
            }
          })

          this.databaseData.map((item, index) => { // For All Position => Select All
            if (index > 0) {
              this.playerPositionDataAllSortData.push(item.position)
              this.playerPositionDataAllSortData = [...new Set(this.playerPositionDataAllSortData)]
            }
          })

          this.databaseData.map((item, index) => { // For Single Position
            const tytu = item.position.split(' ');
            if (index > 0) {
              this.playerPositionDataSingleSort.push(tytu[0])
              this.playerPositionDataSingleSort.sort((a, b) => a < b ? -1 : 1);
              this.playerPositionDataSingleSort = [...new Set(this.playerPositionDataSingleSort)]
            }
          })

          this.databaseData.map((item, index) => { // For Single Position => Select All
            const tytu = item.position.split(' ');
            if (index > 0) {
              this.playerPositionDataSingleSortAll.push(tytu[0])
              this.playerPositionDataSingleSortAll = [...new Set(this.playerPositionDataSingleSortAll)]
            }
          })

          let i = 0;
          for (let item of this.allData) {
            if (i > 2) {
              let obj = {
                header: item.field_description,
                title1: item.title1,
                title2: item.title2,
                title3: item.title3,
                title4: item.title4,
                field: item.field_name,
                width: item.width * 12,
                value: item.value
              };
              this.scrollableCols.push(obj)
            }
            i++;
          }
          this.frozenCols = [
            { field: this.allData[0].field_name, header: this.allData[0].field_description, title1: this.allData[0].title1, title2: this.allData[0].title2, title3: this.allData[0].title3, title4: this.allData[0].title4, width: this.allData[0].width, value: this.allData[0].value },
            { field: this.allData[1].field_name, header: this.allData[1].field_description, title1: this.allData[1].title1, title2: this.allData[1].title2, title3: this.allData[1].title3, title4: this.allData[1].title4, width: this.allData[1].width, value: this.allData[1].value },
            { field: this.allData[2].field_name, header: this.allData[2].field_description, title1: this.allData[2].title1, title2: this.allData[2].title2, title3: this.allData[2].title3, title4: this.allData[2].title4, width: this.allData[2].width, value: this.allData[2].value },
          ];
          this.recordLength = this.databaseData.length;
        }

      });
    this.display11 = false;
    this.hideData = []
    this.allyellowall
  }

  async team_Data() {
    let data: any = {
      apikey: "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
              "players"   : this.playerName.length > 0 ? this.playerName : null,
              "years"     : this.yearName.length   > 0 ? this.yearName   : null,
              "teams"     : this.teamName.length   > 0 ? this.teamName   : null,
              "leagues"   : this.leagueName.length > 0 ? this.leagueName : null,
    };
    this.spinner.show();
    let result_Team;
    (await this.adminService.getTeam_Database(data)).subscribe(result => {
      result_Team = result;

    },
      (err) => {
        this.spinner.hide();
        if (err.status == 401) {
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
        }
      },

      () => {
        this.spinner.hide();
        this.database_Team = result_Team.TeamData;
      });
  }

  async Player_Data() {

    let data: any = {
      apikey: "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
              "players"   : this.playerName.length > 0 ? this.playerName : null,
              "years"     : this.yearName.length   > 0 ? this.yearName   : null,
              "teams"     : this.teamName.length   > 0 ? this.teamName   : null,
              "leagues"   : this.leagueName.length > 0 ? this.leagueName : null,
    };
    this.spinner.show();
    let result_Player;
    (await this.adminService.getPlayer_Database(data)).subscribe(result => {
      result_Player = result;

    },
      (err) => {
        this.spinner.hide();
        if (err.status == 401) {
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
        }
      },

      () => {
        this.spinner.hide();
        this.database_Player = result_Player.PlayerData;
        // console.log(this.database_Player)

      });
  }

  async Year_Data() {
    let data: any = {
      apikey: "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
              "players"   : this.playerName.length > 0 ? this.playerName : null,
              "years"     : this.yearName.length   > 0 ? this.yearName   : null,
              "teams"     : this.teamName.length   > 0 ? this.teamName   : null,
              "leagues"   : this.leagueName.length > 0 ? this.leagueName : null,
    };
    this.spinner.show();
    let result_Year;
    (await this.adminService.getyear_Database(data)).subscribe(result => {
      result_Year = result;
    },
    (err) => {
      this.spinner.hide();
      if (err.status == 401) {
        localStorage.clear();
        this.router.navigateByUrl('/');
        this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
      }
    },
      () => {
        this.spinner.hide();
        this.database_Year = result_Year.YearData;
      });
  }

  async League_Data() {

    let data: any = {
      apikey: "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
              "players"   : this.playerName.length > 0 ? this.playerName : null,
              "years"     : this.yearName.length   > 0 ? this.yearName   : null,
              "teams"     : this.teamName.length   > 0 ? this.teamName   : null,
              "leagues"   : this.leagueName.length > 0 ? this.leagueName : null,
    };

    this.spinner.show();
    let result_League;
    (await this.adminService.getleague_Database(data)).subscribe(result => {
      result_League = result;

    },
      (err) => {
        this.spinner.hide();
        if (err.status == 401) {
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
        }
      },

      () => {
        this.spinner.hide();
        this.database_League = result_League.LeagueData;

      });
  }
  findIndex(o) {
  }
  GetScrollerEndPoint() {
    console.log('sadssad')
   var scrollHeight = $(".ui-table-scrollable-body").prop('scrollHeight');
   var divHeight = $(".ui-table-scrollable-body").height();
   var scrollerEndPoint = scrollHeight - divHeight;

   var divScrollerTop =  $(".ui-table-scrollable-body").scrollTop();
   if(divScrollerTop === scrollerEndPoint)
   {
       alert('End')
   }
}
  loadLazy(event) {
    setTimeout(() => {
        //load data of required page
        let loadedCars = this.databaseData.slice(event.first, (event.first + event.rows));

        //populate page of virtual cars
        Array.prototype.splice.apply(this.databaseData, [...[event.first, event.rows], ...loadedCars]);
        
        //trigger change detection
        this.databaseData = [...this.databaseData];
    }, Math.random() * 1000 + 100);
  }
  async getStaticsDatabaseTeam() {
    this.firSetColorOn = "blue";
    this.secSetColorOn = "red";
    this.locate_disable=false
    this.locate_disablee=true
    this.databaseData = [];
    let data = {'apikey'      : "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A" ,
                "start"       : this.startPointTeam,
                "length"      : this.lengthPointTeam,
                "years"       : this.yearName.length   > 0 ? this.yearName   : null,
                "teams"       : this.teamName.length   > 0 ? this.teamName   : null,
                "leagues"     : this.leagueName.length > 0 ? this.leagueName : null,
                "coloroption" : this.coloroption,
    };    
   
    this.spinner.show();
    let result_Data_Team;
    (await this.adminService.getTeamDatabase(data)).subscribe(result => {

      result_Data_Team = result;

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
        if(result_Data_Team !== null){          
        this.scrollableCols = [];
        this.frozenCols = [];
        this.allTeamData = result_Data_Team.headers;
        this.totalPlayerTeamCount = result_Data_Team.recordsTotal;
        this.footerDataTeam = result_Data_Team.totals;
        if(result_Data_Team.TeamData !== null) {
          this.databaseTeamData = this.databaseTeamData.concat(result_Data_Team.TeamData);
          if( this.all_Color == true){
            this.selectedRows = this.databaseTeamData;
          }
        }
        this.setColorChange();
        for (let header of this.allTeamData) {
          for (let footer of this.footerDataTeam) {
            if (header.field_name === footer.field_name) {
              header.value = footer.value;
            }
          }
        }
          let i = 0;
          for (let item of this.allTeamData) {
            if (i > 1) {
              let obj = {
                header: item.field_description,
                title1: item.title1,
                title2: item.title2,
                title3: item.title3,
                title4: item.title4,
                field: item.field_name,
                width: item.width * 12,
                value: item.value
              };
              this.scrollableCols.push(obj)
            }
            i++;
          }
             this.frozenCols = [
              { field: this.allTeamData[0].field_name , header: this.allTeamData[0].field_description, title1: this.allTeamData[0].title1, title2: this.allTeamData[0].title2, title3: this.allTeamData[0].title3, title4: this.allTeamData[0].title4, width: this.allTeamData[0].width, value: this.allTeamData[0].value},
              { field: this.allTeamData[1].field_name , header: this.allTeamData[1].field_description, title1: this.allTeamData[1].title1, title2: this.allTeamData[1].title2, title3: this.allTeamData[1].title3, title4: this.allTeamData[1].title4, width: this.allTeamData[1].width, value: this.allTeamData[1].value},
              ];
            }
           });

           this.hideData =[]
           this.allyellowall 
  }

  async Team_League_Data() {
    let data: any = {
      apikey: "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
              "years"     : this.yearName.length   > 0 ? this.yearName   : null,
              "teams"     : this.teamName.length   > 0 ? this.teamName   : null,
              "leagues"   : this.leagueName.length > 0 ? this.leagueName : null,
    };
    this.spinner.show();
    let result_League;
    (await this.adminService.getTeam_League(data)).subscribe(result => {
      result_League = result;
    },
      (err) => {
        this.spinner.hide();
        if (err.status == 401) {
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
        }
      },
      () => {
        this.spinner.hide();
        this.database_League = result_League.LeagueData;

      });
  }
  async Team_Team_Data() {
    let data: any = {
      apikey: "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
              "years"     : this.yearName.length   > 0 ? this.yearName   : null,
              "teams"     : this.teamName.length   > 0 ? this.teamName   : null,
              "leagues"   : this.leagueName.length > 0 ? this.leagueName : null,
    };
    this.spinner.show();
    let result_Team;
    (await this.adminService.getTeam_Team(data)).subscribe(result => {
      result_Team = result;
    },
      (err) => {
        this.spinner.hide();
        if (err.status == 401) {
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
        }
      },
      () => {
        this.spinner.hide();
        this.database_Team = result_Team.TeamData;

      });
  }
  async Team_Year_Data() {
    let data: any = {
      apikey: "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
              "years"     : this.yearName.length   > 0 ? this.yearName   : null,
              "teams"     : this.teamName.length   > 0 ? this.teamName   : null,
              "leagues"   : this.leagueName.length > 0 ? this.leagueName : null,
    };
    this.spinner.show();
    let result_Year;
    (await this.adminService.getTeam_Year(data)).subscribe(result => {
      result_Year = result;
    },
      (err) => {
        this.spinner.hide();
        if (err.status == 401) {
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
        }
      },
      () => {
        this.spinner.hide();
        this.database_Year = result_Year.YearData;

      });
  }


  sortPositionAll(val){
    console.log(val)
    let neg = 1;
    let pos = -1;
      if(val == 'Ascending'){
       neg = -1;
       pos = 1;
      }else if(val == 'Descending'){
       neg = 1;
       pos = -1;
      }
        this.playerPositionDataAllSort.sort(function(a, b){
          if(a < b) { return neg; }
          if(a > b) { return pos; }
          return 0;
        })
  }
  sortPositionSigle(val){
    console.log(val)
    let neg = 1;
    let pos = -1;
      if(val == 'Ascending'){
       neg = -1;
       pos = 1;
      }else if(val == 'Descending'){
       neg = 1;
       pos = -1;
      }
        this.playerPositionDataSingleSort.sort(function(a, b){
          if(a < b) { return neg; }
          if(a > b) { return pos; }
          return 0;
        })
  }

  sortPositionSingle(val){
    console.log(val)
    let neg = 1;
    let pos = -1;
      if(val == 'Ascending'){
       neg = -1;
       pos = 1;
      }else if(val == 'Descending'){
       neg = 1;
       pos = -1;
      }
        this.playerPositionDataSingleSort.sort(function(a, b){
          if(a < b) { return neg; }
          if(a > b) { return pos; }
          return 0;
        })
  }

  filterPositionAll(){  
    let tempData = [];
    let tempPlayerData = [];
    let tempTeamData = []
    for(let item of this.databaseData){
      for(let sub of this.selectedPositionAl){
       
        if(item.position.trim() == sub.trim()){
          
          tempData.push(item)
          tempPlayerData.push(item.position)
        }
      }
    }
    this.databaseData = tempData
    this.playerPositionDataAllSort = [...new Set(tempPlayerData)]
    this.display9 = false;   
    this.model.data=""
  }
  
  filterPositionSingle(){  
    let tempData = [];
    let tempPlayerData = [];
    for(let item of this.databaseData){
      let subIe = item.position.split(' ');
      for(let sub of this.selectedPositionSingle){  
        let subI = sub.split(' ');     
        if(subIe[0] == subI[0]){          
          tempData.push(item)
          tempPlayerData.push(item.position)
        }
      }
    }
    this.databaseData = tempData
    this.playerPositionDataSingleSort = [...new Set(tempPlayerData)]
    this.display10 = false;   
    this.model.data=""
  }


  selectedPositionAlclick(value,i){
    this.sortPositionAllId = i  
    console.log(this.sortPositionAllId)
    if(this.selectedPositionAl.length > 0){
      let val = this.selectedPositionAl.findIndex(element => element == value)
      if(val >= 0 ){
        this.selectedPositionAl.splice(val,1)
        this.playerSelectAllPosition= false 
      }else{
        this.selectedPositionAl.push(value)
      }
    }else{
      this.selectedPositionAl.push(value)
    }    
  }

  allyellowPositionAll(){
    this.selectedPositionAl = this.playerPositionDataAllSortData ;
    this.playerSelectAllPosition = true;
    // if(this.selectedPositionAl > 0){
    //   this.playerSelectAllPosition = false
    // }    
  }
  
  allyellowPositionSingle(){
    this.selectedPositionSingle = this.playerPositionDataSingleSortAll ;
    this.playerSelectSinglePosition = true
  }
  
  allyellowPlayerAll(){
    this.selectedPlayerName = this.database_Player;
    this.playerSelectPlayer = true

  }

  allyellowYearAll(){
    this.selectedYearName = this.database_Year ;
    this.playerSelectYear = true
  }

  allyellowLeagueAll(){
    this.selectedLeagueName = this.database_League ;
    this.playerSelectLeague = true
  }

  allyellowTeamAll(){
    this.selectedTeamName = this.database_Team ;
    this.playerSelectTeam = true
  }
  


  removeAll(){
    this.selectedPositionAl  = [];
    this.sortPositionAllId   = null;
    this.selectedPositionSingle = [];
    this.sortPositionSingleId   = null;
    this.sortPlayerId =null;
    this.sortTeamId   =null;
    this.sortYearId   =null;
    this.sortLeagueId =null;
    this.selectedPlayerName =[];
    this.selectedTeamName   =[];
    this.selectedYearName   =[];
    this.selectedLeagueName =[];    

    this.playerSelectSinglePosition =false
    this.playerSelectAllPosition =false
    this.playerSelectYear = false
    this.playerSelectLeague = false
    this.playerSelectPlayer = false
    this.playerSelectTeam = false
  }

  selectedPositionSingleclick(value,i){
    this.sortPositionSingleId = i
    if(this.selectedPositionSingle.length > 0){
      let val = this.selectedPositionSingle.findIndex(element => element == value)
      if(val >= 0 ){
        this.selectedPositionSingle.splice(val,1)
        this.playerSelectSinglePosition = false
      }else{
        this.selectedPositionSingle.push(value)
      }
    }else{
      this.selectedPositionSingle.push(value)
    }
  }
  resetData(){
    if(this.databaseGamePlay === 'playerMode'){
      this.databaseData = [];
      this.radiofieldModel={}            
      this.playerName = [];
      this.teamName = [];
      this.yearName = [];
      this.leagueName = [];
      this.filter1 =null;
      this.selectedRows = ""
      this.regply ='';
      this.selectedPlayerName =[];
      this.selectedTeamName  =[];
      this.selectedYearName =[];
      this.selectedLeagueName =[];
      this.display0= false;
      this.display1= false;
      this.display2= false;
      this.display3= false;
      this.display4= false;
      this.display5= false;
      this.display6= false;
      this.display7= false;
      this.display8= false;
      this.display9= false;
      this.display10= false;
      this.display11= false;
      this.display12= false;
      this.display13= false;
      this.display14= false;
      this.display15= false;
      this.allyellow = false;
      this.subtotal = null;
      this.symbols =[]
      this.takeValue = null;
      this.all_Color = false;
      this.limit1 =null;
      this.tempData = [];
      this.displayModal= false;
      this.displayModal1= false;
      if(this.fieldModel5.item == 'yes'){
        this.fieldModel.sort1 = ""
        this.fieldModel.sort2 = ""
        this.fieldModel.sort3 = ""
        this.fieldModel.sort4 = ""
        this.radiofieldModel.sort1a = 'true'; 
        this.radiofieldModel.sort2a = 'true'; 
        this.radiofieldModel.sort3a = 'true'; 
        this.radiofieldModel.sort4a = 'true'; 
      }
      this.selectedPositionAl = [];
      this.playerPositionDataAllSort = [];
      this.tempTeamData = [];
      this.radioPlayer = {
        radionPlayer: 'true'
      }
      this.selectedCheck = {
        check: 'ok'
      }
      this.firSetColor = "blue"
      this.secSetColor = "red"
      this.firSetColorOn = "blue"
      this.secSetColorOn = "red"
    } else if(this.databaseGamePlay === 'teamMode'){
      this.databaseTeamData =[]
      this.teamName = [];
      this.yearName = [];
      this.leagueName = [];
      this.all_Color = false
      this.selectedRows = ""
      this.displayModal = false;
      this.tempData = []
      this.symbols =[]
      this.takeValue = null;
      this.tempTeamData = [] 

      this.filter1 =null;
        this.selectedRows = ""
        this.regply ='';
        this.selectedPlayerName =[];
        this.selectedTeamName  =[];
        this.selectedYearName =[];
        this.selectedLeagueName =[];
        this.display0= false;
        this.display1= false;
        this.display2= false;
        this.display3= false;
        this.display4= false;
        this.display5= false;
        this.display6= false;
        this.display7= false;
        this.display8= false;
        this.display9= false;
        this.display10= false;
        this.display11= false;
        this.display12= false;
        this.display13= false;
        this.display14= false;
        this.display15= false;
        this.allyellow = false;
        this.subtotal = null;
        this.symbols =[]
        this.takeValue = null;
        this.all_Color = false;
        this.limit1 =null;
        this.tempData = [];
        this.displayModal= false;
        this.displayModal1= false;
        if(this.fieldModel5.item == 'yes'){
          this.fieldModel.sort1 = ""
          this.fieldModel.sort2 = ""
          this.fieldModel.sort3 = ""
          this.fieldModel.sort4 = ""
          this.radiofieldModel.sort1a = 'true'; 
          this.radiofieldModel.sort2a = 'true'; 
          this.radiofieldModel.sort3a = 'true'; 
          this.radiofieldModel.sort4a = 'true'; 
        }
        this.selectedPositionAl = [];
        this.playerPositionDataAllSort = [];
        this.radioPlayer = {
          radionPlayer: 'true'
        }
        this.selectedCheck = {
          check: 'ok'
        }
        this.firSetColor = "blue"
        this.secSetColor = "red"
        this.firSetColorOn = "blue"
        this.secSetColorOn = "red"
    }
}

  reset(){
      if(this.databaseGamePlay === 'playerMode') {
        this.databaseData = [];
        this.radiofieldModel={}            
        this.playerName = [];
        this.teamName = [];
        this.yearName = [];
        this.leagueName = [];
        this.filter1 =null;
        this.selectedRows = ""
        this.regply ='';
        this.selectedPlayerName =[];
        this.selectedTeamName  =[];
        this.selectedYearName =[];
        this.selectedLeagueName =[];
        this.display0= false;
        this.display1= false;
        this.display2= false;
        this.display3= false;
        this.display4= false;
        this.display5= false;
        this.display6= false;
        this.display7= false;
        this.display8= false;
        this.display9= false;
        this.display10= false;
        this.display11= false;
        this.display12= false;
        this.display13= false;
        this.display14= false;
        this.display15= false;
        this.allyellow = false;
        this.subtotal = null;
        this.symbols =[]
        this.takeValue = null;
        this.all_Color = false;
        this.limit1 =null;
        this.tempData = [];
        this.displayModal= false;
        this.displayModal1= false;
        if(this.fieldModel5.item == 'yes'){
          this.fieldModel.sort1 = ""
          this.fieldModel.sort2 = ""
          this.fieldModel.sort3 = ""
          this.fieldModel.sort4 = ""
          this.radiofieldModel.sort1a = 'true'; 
          this.radiofieldModel.sort2a = 'true'; 
          this.radiofieldModel.sort3a = 'true'; 
          this.radiofieldModel.sort4a = 'true'; 
        }
        this.selectedPositionAl = [];
        this.playerPositionDataAllSort = [];
        this.tempTeamData = [];
        this.radioPlayer = {
          radionPlayer: 'true'
        }
        this.selectedCheck = {
          check: 'ok'
        }
        this.firSetColor = "blue"
        this.secSetColor = "red"
        this.firSetColorOn = "blue"
        this.secSetColorOn = "red"
        this.getStaticsDatabase(); 
      } else if(this.databaseGamePlay === 'teamMode'){
        this.databaseTeamData =[]
        this.teamName = [];
        this.yearName = [];
        this.leagueName = [];
        this.all_Color = false
        this.selectedRows = ""
        this.displayModal = false;
        this.tempData = []
        this.symbols =[]
        this.takeValue = null;
        this.tempTeamData = []

        this.filter1 =null;
        this.selectedRows = ""
        this.regply ='';
        this.selectedPlayerName =[];
        this.selectedTeamName  =[];
        this.selectedYearName =[];
        this.selectedLeagueName =[];
        this.display0= false;
        this.display1= false;
        this.display2= false;
        this.display3= false;
        this.display4= false;
        this.display5= false;
        this.display6= false;
        this.display7= false;
        this.display8= false;
        this.display9= false;
        this.display10= false;
        this.display11= false;
        this.display12= false;
        this.display13= false;
        this.display14= false;
        this.display15= false;
        this.allyellow = false;
        this.subtotal = null;
        this.symbols =[]
        this.takeValue = null;
        this.all_Color = false;
        this.limit1 =null;
        this.tempData = [];
        this.displayModal= false;
        this.displayModal1= false;
        if(this.fieldModel5.item == 'yes'){
          this.fieldModel.sort1 = ""
          this.fieldModel.sort2 = ""
          this.fieldModel.sort3 = ""
          this.fieldModel.sort4 = ""
          this.radiofieldModel.sort1a = 'true'; 
          this.radiofieldModel.sort2a = 'true'; 
          this.radiofieldModel.sort3a = 'true'; 
          this.radiofieldModel.sort4a = 'true'; 
        }
        this.selectedPositionAl = [];
        this.playerPositionDataAllSort = [];
        this.radioPlayer = {
          radionPlayer: 'true'
        }
        this.selectedCheck = {
          check: 'ok'
        }
        this.firSetColor = "blue"
        this.secSetColor = "red"
        this.firSetColorOn = "blue"
        this.secSetColorOn = "red"
        this.getStaticsDatabaseTeam(); 
      }
  }

  selectTeamData(e){
    this.playerToData = e.teamname;
    this.databaseData.map(col => {
      // col.activeRow = false
    })
    e.activeRow = true;
    this.selectedName = e.teamname;
  }

  filterLeague(){
    if(this.databaseData && this.databaseData.length >0){
      this.databaseData = [];
    this.leagueName =this.selectedLeagueName;
    this.startPoint = 1;
    this.lengthPoint = 50;
    this.getStaticsDatabase();
    this.display3 = false;
    this.model.data=""
    } else if(this.databaseTeamData && this.databaseTeamData.length >0){
    this.databaseTeamData = [];
    this.leagueName =this.selectedLeagueName;
    this.startPointTeam = 1;
    this.lengthPointTeam = 50;
    this.getStaticsDatabaseTeam();
    this.display3 = false;
    this.model.data=""    
    }
  }

  filterRegPly(item){
    if(this.databaseData && this.databaseData.length > 0){
    this.databaseData = [];
    this.regply =item;
    this.startPoint = 1;
    this.lengthPoint = 50;
    this.getStaticsDatabase();
    }
  }

  playerTeamName(item){
    this.databaseData = [];
    this.subtotal = item;
    this.startPoint = 1;
    this.lengthPoint = 50;
    this.getStaticsDatabase();
  }

  selectedLeagueclick(value,i){
    this.sortLeagueId = i
    if(this.selectedLeagueName.length > 0){
      let val = this.selectedLeagueName.findIndex(element => element.league == value.league)
      if(val >= 0 ){
        this.selectedLeagueName.splice(val,1)
        this.playerSelectLeague = false;
        value.checked = false
      }else{
        this.selectedLeagueName.push({league:value.league})
        value.checked = true
      }
    }else{
      this.selectedLeagueName.push({league:value.league})
      value.checked = true
    }
  }

  getfieldDataLeague(element){
    console.log(element)
    this.asenItemLeague = element
    // console.log(this.asenItemLeague)
    }

    sortLeague(val){
      let y = this.asenItemLeague;
      let v = this.sortingItem;
      let neg = 1;
      let pos = -1;
      if(val == 'Ascending'){
        neg = -1;
        pos = 1;
      }else if(val == 'Descending'){
        neg = 1;
        pos = -1;
      }
      this.currentSortOrderLeague = y;
      this.currentSortValueLeague =  v;

        this.database_League.sort(function(a, b){
          if(a['league'] < b['league']) { return neg; }
          if(a['league'] > b['league']) { return pos; }
          return 0;
        })

    }

  filterYear(){
    if (this.databaseData && this.databaseData.length > 0){
    this.databaseData = [];
    this.yearName =this.selectedYearName;
    this.startPoint = 1;
    this.lengthPoint = 50;
    this.getStaticsDatabase();
    this.display1 = false;
    this.model.data=""
    } else if(this.databaseTeamData && this.databaseTeamData.length > 0){
      this.databaseTeamData = [];
    this.yearName =this.selectedYearName;
    this.startPointTeam = 1;
    this.lengthPointTeam = 50;
    this.getStaticsDatabaseTeam();
    this.display1 = false;
    this.model.data=""
    }
  }

  selectedYearclick(value,i){
    this.sortYearId = i
    if(this.selectedYearName.length > 0){
      let val = this.selectedYearName.findIndex(element => element.year1 == value.year1)
      if(val >= 0 ){
        this.selectedYearName.splice(val,1)
        this.playerSelectYear = false;
        value.checked = false;
      }else{
        this.selectedYearName.push({year1:value.year1})
        value.checked = true;
      }
    }else{
      this.selectedYearName.push({year1:value.year1})
      value.checked = true;
    }
  }

  getfieldDataYear(element){
    this.asenItemYear = element
    // console.log(this.asenItemYear)
    }

    sortYear(val){
      let y = this.asenItemYear;
      // let v = this.sortingItem;
      // console.log(this.asenItemYear, this.sortingItem)
      let neg = 1;
      let pos = -1;
      if(val == 'Ascending'){
        neg = -1;
        pos = 1;
      }else if(val == 'Descending'){
        neg = 1;
        pos = -1;
      }
      this.currentSortOrderYear = y;
      // this.currentSortValueYear =  v;

        this.database_Year.sort(function(a, b){
          if(a['year1'] < b['year1']) { return neg; }
          if(a['year1'] > b['year1']) { return pos; }
          return 0;
        })

    }

  filterPlayer(){
    this.databaseData = [];
    this.playerName =this.selectedPlayerName;
    this.startPoint = 1;
    this.lengthPoint = 50;
    this.getStaticsDatabase();
    this.display2 = false;
    this.model.data=""
  }

  selectedNameclick(value,i){
    this.sortPlayerId = i
    if(this.selectedPlayerName.length > 0){
      let val = this.selectedPlayerName.findIndex(element => element.name == value.name)
      if(val >= 0 ){
        this.selectedPlayerName.splice(val,1)
        this.playerSelectPlayer = false
        value.checked = false;
      }else{
        this.selectedPlayerName.push({name:value.name})
        value.checked = true;
      }
    }else{
      this.selectedPlayerName.push({name:value.name})
      value.checked = true;
    }
  }

  selectedUnhide(value,i){
    this.unhideClick = value;
    this.unhideClickId = i;
    // console.log(this.unhideClick)
  }

 

  getfieldDataPlayer(element){
    this.asenItemPlayer = element
    // console.log(this.asenItemPlayer)
  }

  sortPlayer(val){
      let p = this.asenItemPlayer;
      let v = this.sortingItem;
      let neg = 1;
      let pos = -1;
      if(val == 'Ascending'){
        neg = -1;
        pos = 1;
      }else if(val == 'Descending'){
        neg = 1;
        pos = -1;
      }
      this.currentSortOrderPlayer = p;
      this.currentSortValuePlayer =  v;


      this.database_Player.sort(function(a, b){
        if(a['name'] < b['name']) { return neg; }
        if(a['name'] > b['name']) { return pos; }
        return 0;
      })
  }

  filterTeam(){
    if(this.databaseData && this.databaseData.length > 0){
    this.databaseData = [];
    this.teamName =this.selectedTeamName
    this.getStaticsDatabase();
    this.display4 = false;
    this.model.data=""
    } else if(this.databaseTeamData && this.databaseTeamData.length > 0){
      this.databaseTeamData = [];
    this.teamName =this.selectedTeamName
    this.getStaticsDatabaseTeam();
    this.display4 = false;
    this.model.data=""
    }
  }

  selectedTeamclick(value,i){
    this.sortTeamId = i
    if(this.selectedTeamName.length > 0){
      let val = this.selectedTeamName.findIndex(element => element.teamname == value.teamname)
      if(val >= 0 ){
        this.selectedTeamName.splice(val,1)
        value.checked = false;
      }else{
        this.selectedTeamName.push({teamname:value.teamname})
        value.checked = true;
      }
    }else{
      this.selectedTeamName.push({teamname:value.teamname})
      value.checked = true;
    }
  }

  selectedPositionclick(value,i){
    this.sortPlaPositionId = i
    if(this.selectedPositionName.length > 0){
      let val = this.selectedPositionName.findIndex(element => element.position == value)
      if(val >= 0 ){
        this.selectedPositionName.splice(val,1)
      }else{
        this.selectedPositionName.push({position:value})

      }
    }else{
      this.selectedPositionName.push({position:value})
    }
  }

  getfieldDataTeam(element){
    this.asenItemTeam = element
    console.log(this.asenItemTeam)
  }

  sortTeam(val){
    let t = this.asenItemTeam;
    let v = this.sortingItem;
    let neg = 1;
    let pos = -1;
      if(val == 'Ascending'){
       neg = -1;
       pos = 1;
      }else if(val == 'Descending'){
       neg = 1;
       pos = -1;
      }
      this.currentSortOrderTeam = t;
      this.currentSortValueTeam =  v;

      // if(v == 'PLAYER NAME'){
        this.database_Team.sort(function(a, b){
          if(a['teamname'] < b['teamname']) { return neg; }
          if(a['teamname'] > b['teamname']) { return pos; }
          return 0;
        })
      // }
  }

  selectlist: any = [
    { value: ''            , label: 'None' },
    { value: 'name'           , label: 'Player Name' },
    { value: 'year1'          , label: 'YEAR' },
    { value: 'teamcode'       , label: 'TEAM CODE'},
    { value: 'teamname'       , label: 'TEAM NAME'},
    { value: 'league'         , label: 'LGE'},
    { value: 'height'         , label: 'HT'},
    { value: 'position'       , label: 'POS'},
    { value: 'birthday'       , label: 'BIRTHDAY'},
    { value: 'playoffs'       , label: 'REG / PLY'},
    { value: 'g'              , label: 'G'},
    { value: 'gs'             , label: 'GS'},
    { value: 'min'            , label: 'MIN'},
    { value: 'fgm'            , label: 'FGM'},
    { value: 'fga'            , label: 'FGA'},
    { value: 'fgpercent'      , label: 'FG%'},
    { value: 'efffgpercent'   , label: 'EFFFG%'},
    { value: 'scorefgpercent' , label: 'SCORE FG%'},
    { value: 'stg'            , label: 'SCORE OPP/G'},
    { value: 'stmin'          , label: 'SCORE OPP/48'},
    { value: 'twoptfgpercent' , label: '2PT FG%'},
    { value: 'threepfga'      , label: '3PT FGM'},
    { value: 'threepfgpercent'  , label: '3PT FGA'},
    { value: 'threepfgpercent'  , label: '3PT FG%'},
    { value: 'ftm'            , label: 'FTM'},
    { value: 'fta'            , label: 'FTA'},
    { value: 'ftpercent'      , label: 'FT%'},
    { value: 'oreb'           , label: 'OFF REB'},
    { value: 'dreb'           , label: 'DEF REB'},
    { value: 'treb'           , label: 'TOT REB'},
    { value: 'ast'            , label: 'AST'},
    { value: 'pf'             , label: 'PF'},
    { value: 'dq'             , label: 'DQ'},
    { value: 'st'             , label: 'ST'},
    { value: 'to1'            , label: 'TO'},
    { value: 'bs'             , label: 'BS'},
    { value: 'points'         , label: 'PTS'},
    { value: 'pointsmin'      , label: 'PTS/G'},
    { value: 'performanceptsg'    , label: 'PREM RAT/G'},
    { value: 'performanceptsmin'  , label: 'PREM RAT/MIN'},
    { value: 'oldperformanceptsg'     , label: 'OPREM RAT/G'},
    { value: 'oldperformanceptsmin'   , label: 'OPREM RAT/MIN'},
    { value: 'possfact'          , label: 'POS FACT'},
    { value: 'pershoot'          , label: '% SHOT'},
    { value: 'per3ptst'          , label: '% 3PTSHOT'},
    { value: 'perst'             , label: '% FLD'},
    { value: 'perto'             , label: '% TO'},
    { value: 'perpass'           , label: '% PASS'},
    { value: 'orebrat'           , label: 'OFF REB RAT'},
    { value: 'drebrat'           , label: 'DEF REB RAT'},
    { value: 'trebrat'           , label: 'TOT REB RAT'},
    { value: 'perfoul'           , label: '% FOUL'},
    { value: 'pershoot'          , label: '% ST'},
    { value: 'perbs'             , label: '% BS'},
    { value: 'ming'              , label: 'MIN/G'},
    { value: 'fgmg'              , label: 'FGM/G'},
    { value: 'fgag'              , label: 'FGA/G'},
    { value: 'threepfgmg'        , label: '3PT FGM/G'},
    { value: 'threepfga'         , label: '3PT FGA/G'},
    { value: 'ftmg'              , label: 'FTM/G'},
    { value: 'ftag'              , label: 'FTA/G'},
    { value: 'orebg'             , label: 'OFF REB/G'},
    { value: 'drebg'             , label: 'DEF REB/G'},
    { value: 'trebg'             , label: 'TOT REB/G'},
    { value: 'astg'              , label: 'AST/G'},
    { value: 'pfg'               , label: 'PF/G'},
    { value: 'stg'               , label: 'ST/G'},
    { value: 'to1g'              , label: 'TO/G'},
    { value: 'bsg'               , label: 'BS/G'},
    { value: 'fgmmin'            , label: 'FGM/MIN'},
    { value: 'fgamin'            , label: 'FGA/MIN'},
    { value: 'threepfgmmin'      , label: '3PT FGM/MIN'},
    { value: 'threepfgamin'      , label: '3PT FGA/MIN'},
    { value: 'ftmmin'            , label: 'FTM/MIN'},
    { value: 'ftamin'            , label: 'FTA/MIN'},
    { value: 'orebmin'           , label: 'OFF REB/MIN'},
    { value: 'drebmin'           , label: 'DEF REB/MIN'},
    { value: 'trebmin'           , label: 'TOT REB/MIN'},
    { value: 'astmin'            , label: 'AST/MIN'},
    { value: 'pfmin'             , label: 'PF/MIN'},
    { value: 'stmin'             , label: 'ST/MIN'},
    { value: 'to1min'            , label: 'TO/MIN'},
    { value: 'bsmin'             , label: 'BS/MIN'},
    { value: 'pfmin'             , label: 'PTS/MIN'},
    { value: 'age'               , label: 'AGE'},
  ];

  selectLi(item){
    if(this.databaseData && this.databaseData.length > 0){
      for(let item of this.selectlist){
        item.activeRow = false
      }
      this.limit1 = item.value
      item.activeRow = true
    } else if(this.databaseTeamData && this.databaseTeamData.length > 0){
      for(let item of this.selectTeamList_Draft){
        item.activeRow = false
      }
      // this.limit1 = item.value
      item.activeRow = true
    }
  }

  selectTeamList_Draft: any =[
    { value: ''            , label: 'None' },    
    { value: 'year1'       , label: 'YEAR' },
    { value: 'teamcode'    , label: 'Team Code' },
    { value: 'teamname'    , label: 'Team Name' },
    { value: 'league'      , label: 'LGE' },
    { value: 'div1'        , label: 'DIV' },
    { value: 'playoffs'    , label: 'Reg/Ply' },
    { value: 'games'       , label: 'G' },
    { value: 'won'         , label: 'W' },
    { value: 'lost'        , label: 'L' },
    { value: 'wlpct'       , label: 'W-L%' },
    { value: 'homewin'     , label: 'Home WIN' },
    { value: 'homeloss'    , label: 'Home LOSS' },
    { value: 'awaywin'     , label: 'Away WIN' },
    { value: 'awayloss'    , label: 'AWAY LOSS' },
    { value: 'neutwin'     , label: 'NEUT WIN' },
    { value: 'neutloss'    , label: 'NEUT LOSS' },
    { value: 'min'         , label: 'MIN' },
    { value: 'offfgm'       , label: 'OFF FGM' },
    { value: 'offfga'         , label: 'OFF FGA' },
    { value: 'offfgpct'         , label: 'OFF FG%' },
    { value: 'offefffgpct'        , label: 'OFF EFF FG%' },
    { value: 'offscorefgpercent'   , label: 'OFF Score FG%' },
    { value: 'off2pfgpct'         , label: 'OFF 2PT FG%' }, // Diff
    { value: 'off3pfgm'          , label: 'OFF 3PT FGM' }, // Diff
    { value: 'off3pfga'          , label: 'OFF 3PT FGA' },
    { value: 'off3pfgpct'        , label: 'OFF 3PT FG%' },
    { value: 'offftm'            , label: 'OFF FTM' },
    { value: 'offfta'            , label: 'OFF FTA' },
    { value: 'offftpct'          , label: 'OFF FT%' },
    { value: 'offoffreb'         , label: 'OFF OFF REB' },
    { value: 'offdefreb'         , label: 'OFF DEF REB' },
    { value: 'offtotreb'         , label: 'OFF TOT REB' },
    { value: 'offast'            , label: 'OFF AST' },
    { value: 'offpf'             , label: 'OFF PF' },
    { value: 'offdq'             , label: 'OFF DQ' },
    { value: 'offst'             , label: 'OFF ST' },
    { value: 'offto'             , label: 'OFF TO' },
    { value: 'offbs'             , label: 'OFF BS' },
    { value: 'defbs'             , label: 'DEF BS' },
    { value: 'deffgm'            , label: 'DEF FGM' },
    { value: 'deffga'            , label: 'DEF FGA' },
    { value: 'deffgpct'          , label: 'DEF FG%' },
    { value: 'defefffgpct'         , label: 'DEF EFF FG%' },
    { value: 'defscorefgpercent'     , label: 'DEF Score FG%' },
    { value: 'def2pfgpct'           , label: 'DEF 2PT FG%' }, // Rela
    { value: 'def3pfgm'            , label: 'DEF 3PT FGM' },
    { value: 'def3pfga'           , label: 'DEF 3PT FGA' },
    { value: 'def3pfgpct'         , label: 'DEF 3PT FG%' },
    { value: 'defftm'             , label: 'DEF FTM' },
    { value: 'deffta'             , label: 'DEF FTA' },
    { value: 'defftpct'           , label: 'DEF FT%' },
    { value: 'defoffreb'          , label: 'DEF OFF REB' },
    { value: 'defdefreb'          , label: 'DEF DEF REB' },
    { value: 'deftotreb'          , label: 'DEF TOT REB' },
    { value: 'defast'             , label: 'DEF AST' },
    { value: 'defpts'             , label: 'DEF PT' }, // Diff
    { value: 'defdq'              , label: 'DEF DQ' },
    { value: 'defst'              , label: 'DEF ST' },
    { value: 'defto'              , label: 'DEF TO' },
    { value: 'defbs'              , label: 'DEF BS' },
    { value: 'offpts'             , label: 'OFF PTS' },
    { value: 'defpts'             , label: 'DEF PTS' },
    { value: 'offptsg'            , label: 'OFF PTS/G' },
    { value: 'defptsg'            , label: 'DEF PTS/G' },
    { value: 'ptsdiff'            , label: 'PTS Diff' },
    { value: 'totalpointspergame'  , label: 'Totals PTS/G'},
    { value: 'offfgmg'            , label: 'OFF FGM/G' },
    { value: 'offfgag'           , label: 'OFF FGA/G' }, 
    { value: 'off3pfgm'         , label: 'OFF 3PFGM/G' }, // Rela
    { value: 'off3pfga'         , label: 'OFF 3PFGA/G' }, // Rela
    { value: 'offftmg'          , label: 'OFF FTM/G' },
    { value: 'offftmg'          , label: 'OFF FA/G' },
    { value: 'offoffrebg'       , label: 'OFF OREB/G' },
    { value: 'offdefrebg'       , label: 'OFF DREB/G' },
    { value: 'offtotrebg'       , label: 'OFF TREB/G' },
    { value: 'offastg'          , label: 'OFF AST/G' },
    { value: 'offpfg'           , label: 'OFF PF/G' },
    { value: 'offstg'           , label: 'OFF ST/G' },
    { value: 'offtog'           , label: 'OFF TO/G' },
    { value: 'offbsg'           , label: 'OFF BS/G' },
    { value: 'deffgmg'          , label: 'DEF FGM/G' },
    { value: 'deffgag'          , label: 'DEF FGA/G' },
    { value: 'def3ptfgmg'       , label: 'DEF 3PFGM/G' },
    { value: 'def3ptfgag'       , label: 'DEF 3PFGA/G' },
    { value: 'defftmg'          , label: 'DEF FTM/G' },
    { value: 'defftag'          , label: 'DEF FTA/G' },
    { value: 'defoffrebg'       , label: 'DEF OREB/G' },
    { value: 'defdefrebg'       , label: 'DEF DREB/G' },
    { value: 'defdefrebg'       , label: 'DEF TREB/G' },
    { value: 'defastg'          , label: 'DEF AST/G' },
    { value: 'defpfg'           , label: 'DEF PF/G' },
    { value: 'defstg'             , label: 'DEF ST/G' },
    { value: 'deftog'               , label: 'DEF TO/G' },
    { value: 'offbsg'                 , label: 'DEF BS/G' },
    { value: 'avgoffptsper48'          , label: 'AVG OFF/PTS/48' },
    { value: 'avgdefptsper48'           , label: 'AVG DEF/PTS/48' },
    { value: 'pointsper48mindiff'        , label: 'PTS DIFF 48min' },
    { value: 'avgteamposs'               , label: 'AVG TEAM POSS' },
    { value: 'possper48mingame'         , label: 'POSS 48MIN GAME' },
    { value: 'possperqtr'              , label: 'POSS PER QTR' },
    { value: 'timeperposs'            , label: 'TIME PER POSS' },
    { value: 'offptsposs'           , label: 'OFF PTS POSS' },
    { value: 'defptsperposs'       , label: 'DEF PTS POSS' },
    { value: 'diffptsperposs'     , label: 'DIEF PTS POSS' },
    { value: 'offfgm100poss'       , label: 'OFF FGM 100POSS' },
    { value: 'offfga100poss'       , label: 'OFF FGA 100POSS' },
    { value: 'off3pfgm'           , label: 'OFF 3PFGM 100POSS' },
    { value: 'off3pfgpct'        , label: 'OFF 3PFGA 100POSS' }, //Diff
    { value: 'offftm100poss'     , label: 'OFF FTM 100POSS' },
    { value: 'offfta100poss'     , label: 'OFF FTA 100POSS' },
    { value: 'offoreb100poss'    , label: 'OFF OREB 100POSS' },
    { value: 'offoreb100poss'    , label: 'OFF ODEB 100POSS' }, //Ext
    { value: 'offoreb100poss'    , label: 'OFF OTEB 100POSS' }, // Ext
    { value: 'offast100poss'     , label: 'OFF AST 100POSS' },
    { value: 'offpf100poss'      , label: 'OFF PF 100POSS' },
    { value: 'offst100poss'      , label: 'OFF ST 100POSS' },
    { value: 'offto100poss'      , label: 'OFF TO 100POSS' },
    { value: 'offbs100poss'      , label: 'OFF BS 100POSS' },
    { value: 'deffgm100poss'     , label: 'DEF FGM 100POSS' },
    { value: 'deffga100poss'     , label: 'DEF FGA 100POSS' },
    { value: 'def3fgm100poss'    , label: 'DEF 3PFGM 100POSS' },
    { value: 'def3fga100poss'    , label: 'DEF 3PFGA 100POSS' },
    { value: 'defftm100poss'     , label: 'DEF FTM 100POSS' },
    { value: 'deffta100poss'     , label: 'DEF FTA 100POSS' },
    { value: 'deforeb100poss'    , label: 'DEF OREB 100POSS' },
    { value: 'defdreb100poss'    , label: 'DEF DREB 100POSS' },
    { value: 'deftreb100poss'    , label: 'DEF TREB 100POSS' },
    { value: 'defast100poss'      , label: 'DEF AST 100POSS' },
    { value: 'defpf100poss'         , label: 'DEF PF 100POSS' },
    { value: 'defst100poss'           , label: 'DEF ST 100POSS' },
    { value: 'defto100poss'             , label: 'DEF TO 100POSS' },
    { value: 'defscopp100poss'            , label: 'DEF ScOpp 100POSS' },
    { value: 'todiff100poss'                , label: 'TO DIFF 100POSS' },
    { value: 'rebdiff100poss'                 , label: 'REB DIFF 100POSS' },
    { value: 'nonstealforcedto100poss'         , label: 'NONSTL FTO 100POSS' },
    { value: 'offrebpct'                       , label: 'OFF REB PCT' }, // offrebpct
    { value: 'defrebpct'                      , label: 'DEF REB PCT' },
    { value: 'totrebpct'                    , label: 'TOT REB PCT' },
    { value: 'astfgm'                     , label: 'AST FGM' },
  ] 




  selectColumPosition(item, i){
    if(this.databaseData && this.databaseData.length > 0){
      for(let item of this.allData){
        item.activeRow = false
      }
      this.columnPosition = i;
      this.columnOriginalPosition = i;
      // console.log(this.columnPosition)
      this.selectHeader = item;
      // this.selectBody = item;
      item.activeRow = true;    
    } else if(this.databaseTeamData && this.databaseTeamData.length > 0){
      for(let item of this.allTeamData){
        item.activeRow = false
      }
      this.columnPosition = i;
      this.columnOriginalPosition = i;
      // console.log(this.columnPosition)
      this.selectHeader = item;
      // this.selectBody = item;
      item.activeRow = true;
    }
  }

  move_up(){
    if(this.databaseData && this.databaseData.length > 0){
      if(this.columnPosition >= 4){
        // console.log(this.columnPosition)
        this.allData.splice(this.columnPosition,1);
        this.columnPosition--;
        this.allData.splice(this.columnPosition, 0,this.selectHeader);
        for(let item of this.allData){
          item.activeRow = false
        }
        this.selectHeader.activeRow = true;
      }
    }else if(this.databaseTeamData && this.databaseTeamData.length > 0){
      if(this.columnPosition >= 3){
        // console.log(this.columnPosition)
        this.allTeamData.splice(this.columnPosition,1);
        this.columnPosition--;
        this.allTeamData.splice(this.columnPosition, 0,this.selectHeader);
        for(let item of this.allTeamData){
          item.activeRow = false
        }
        this.selectHeader.activeRow = true;
      }
    }
  }
  
  move_down(){
    if(this.databaseData && this.databaseData.length > 0){
      if(this.columnPosition >= 3 && this.columnPosition <= this.allData.length){
        // console.log(this.columnPosition)
        this.allData.splice(this.columnPosition,1);
        this.columnPosition++;
        this.allData.splice(this.columnPosition, 0,this.selectHeader);
        for(let item of this.allData){
          item.activeRow = false
        }
        this.selectHeader.activeRow = true;
      } 
    } else if(this.databaseTeamData && this.databaseTeamData.length > 0){
      if(this.columnPosition >= 2 && this.columnPosition <= this.allTeamData.length){
        // console.log(this.columnPosition)
        this.allTeamData.splice(this.columnPosition,1);
        this.columnPosition++;
        this.allTeamData.splice(this.columnPosition, 0,this.selectHeader);
        for(let item of this.allTeamData){
          item.activeRow = false
        }
        this.selectHeader.activeRow = true;
      } 
    }


  }

  ok_columnPosition(){
    if(this.databaseData && this.databaseData.length > 0){
      this.scrollableCols =[]
      this.commonHeaderFunction();
      this.display13 = false;
    } else if(this.databaseTeamData && this.databaseTeamData.length > 0){
      this.scrollableCols =[]
      this.commonHeaderTeamFunction();
      this.display13 = false;
    }
  }
 
  // hideColumn(i) {
  //   if(i >=2){
  //     let index = i;
  //     this.columnHideIndex = index;
  //     this.columnHide = this.allData[index];
  //     this.hideData.push({index:index,data:this.columnHide});
  //     // this.allData.splice(index,1);
  //     this.allData[index]['hideData'] = true;
  //     console.log(this.allData[index]);  
  //     this.commonHeaderFunction();
  //   }
  // }

  hideColumn(i) {
    if(this.databaseData && this.databaseData.length > 0){
      if(i >=2){
        let index = i;
        this.columnHideIndex = index;
        this.columnHide = this.allData[index];
        this.hideData.push({index:index,data:this.columnHide});
        this.allData[index]['hideData'] = true;
        console.log(this.allData[index]);  
        this.commonHeaderFunction();
      }
    } else if(this.databaseTeamData && this.databaseTeamData.length > 0){
        if(i >=1){
          let index = i;
          this.columnHideIndex = index;
          this.columnHide = this.allTeamData[index];
          this.hideData.push({index:index,data:this.columnHide});
          this.allTeamData[index]['hideData'] = true;
          console.log(this.allTeamData[index]);  
          this.commonHeaderTeamFunction();
        }
      }
  }
  // unhideColumn(){
  //   if(this.databaseData && this.databaseData.length > 0){
  //     let data:any; 
  //   for(let item of this.hideData){
  //     if(item.data.title1 == this.unhideClick.data.title1){
  //       data = item.data;
  //     }
  //   }
  //   console.log(parseInt(data.title1)-1)
  //   // this.allData.splice((parseInt(data.title1)-1),0,data);
  //   for(let item of this.allData){
  //     if(item.title1 == data.title1){
  //       item.hideData = false;
  //     }
  //   }
  //   this.hideData.splice(this.unhideClickId,1)
  //   console.log(data) 
  //   this.display11 = false;
  //   this.commonHeaderFunction();
  //   this.unhideClickId =null;
  //   } else if(this.databaseTeamData && this.databaseTeamData.length > 0){
  //       let data:any; 
  //       for(let item of this.hideData){
  //         if(item.data.title1 == this.unhideClick.data.title1){
  //           data = item.data;
  //         }
  //       }
  //       console.log(parseInt(data.title1)-1)
  //       for(let item of this.allTeamData){
  //         if(item.title1 == data.title1){
  //           item.hideData = false;
  //         }
  //       }
  //       this.hideData.splice(this.unhideClickId,1)
  //       console.log(data) 
  //       this.display11 = false;
  //       this.commonHeaderTeamFunction();
  //       this.unhideClickId =null;
  //     }
  //   }

  unhideColumn(){
    if(this.databaseData && this.databaseData.length){
      let data:any; 
      for(let item of this.hideData){
        if(item.data.title1 == this.unhideClick.data.title1){
          data = item.data;
        }
      }
      console.log(parseInt(data.title1)-1)
      // this.allData.splice((parseInt(data.title1)-1),0,data);
      for(let item of this.allData){
        if(item.title1 == data.title1){
          item.hideData = false;
        }
      }
      this.hideData.splice(this.unhideClickId,1)
      console.log(data) 
      this.display11 = false;
      this.commonHeaderFunction();
      this.unhideClickId =null;
    } else if(this.databaseTeamData && this.databaseTeamData.length){
        let data: any;
        for (let item of this.hideData){
          if(item.data.title1 == this.unhideClick.data.title1){
            data = item.data;
          }0
        }
        console.log(parseInt(data.title1)-1)
        for(let item of this.allTeamData){
          if(item.title1 == data.title1){
            item.hideData = false;
          }
        }
        this.hideData.splice(this.unhideClickId,1)
        console.log(data)
        this.commonHeaderTeamFunction();
        this.unhideClickId = null;
      }
  }

  filterLimit(){
    if(this.databaseData && this.databaseData.length > 0){
      this.databaseData = [];
      this.startPoint = 1;
      this.lengthPoint = 50;
      this.getStaticsDatabase();
      this.display8 = false;
      this.model.data=""
      console.log(this.lowLimit1)
      if(this.lowLimit1 == 'yes'){
        this.highLimit = null; 
        this.lowLimit = null; 
      }
    } else if(this.databaseTeamData && this.databaseTeamData.length > 0){
        this.databaseTeamData = [];
        this.startPointTeam = 1;
        this.lengthPointTeam = 50;
        this.getStaticsDatabaseTeam();
        this.display8 = false;
        this.model.data=""
        // console.log(this.lowLimit1)
        // if(this.lowLimit1 == 'yes'){
        //   this.highLimit = null; 
        //   this.lowLimit = null; 
        // }
    }
  }

  cancelMulti() {
    this.showDialog0();
    this.displayModal =false
    this.display15= false;
    this.selectedPlayerName = []
    this.selectedTeamName   = []
    this.selectedYearName   = []
    this.selectedLeagueName = []
    // this.hideData =[]
    this.displayModal1 = false;
    this.displayModal = false;
    this.symbols =[]
    this.takeValue = null;    
    if(this.findInput1 == 'yes'){
      console.log(this.findInput1, "222")
      this.findInput.data = null; 
    }
  }

  backClicked() {
    this._location.back();
  }

  sortdropdown: any = [
      { label: 'NONE'           , value: '' },
      { label: 'PLAYER NAME'    , value: ''},
      { label: 'YEAR'           , value: '' },
      { label: 'TEAM CODE'      , value: ''},
      { label: 'TEAM NAME'      , value: ''},
      { label: 'LGE'            , value: ''},
      { label: 'HT'             , value: ''},
      { label: 'POSITION'       , value: ''},
      { label: 'BIRTHDAY'       , value: ''},
      { label: 'REG / PLY'      , value: ''},
      { label: 'G'             , value: ''},
      { label: 'GS'           , value: ''},
      { label: 'MIN'          , value: ''},
      { label: 'FGM'          , value: ''},
      { label: 'FGA'          , value: ''},
      { label: 'FG%'           , value: ''},
      { label: 'EFFFG%'         , value: ''},
      { label: 'SCORE FG%'      , value: ''},
      { label: 'SCORE OPP/G'    , value: ''},
      { label: 'SCORE OPP/48'   , value: ''},
      { label: '2PT FG%'      , value: ''},
      { label: '3PT FGM'    , value: ''},
      { label: '3PT FGA'    , value: ''},
      { label: '3PT FG%'    , value: ''},
      { label: 'FTM'        , value: ''},
      { label: 'FTA'        , value: ''},
      { label: 'FT%'        , value: ''},
      { label: 'OFF REB'    , value: ''},
      { label: 'DEF REB'    , value: ''},
      { label: 'TOT REB'    , value: ''},
      { label: 'AST'          , value: ''},
      { label: 'PF'             , value: ''},
      { label: 'DQ'             , value: ''},
      { label: 'ST'             , value: ''},
      { label: 'TO'             , value: ''},
      { label: 'BS'             , value: ''},
      { label: 'PTS'            , value: ''},
      { label: 'PTS/G'          , value: ''},
      { label: 'PREM RAT/G'       , value: ''},
      { label: 'PREM RAT/MIN '    , value: ''},
      { label: 'OPREM RAT/G'      , value: ''},
      { label: 'OPREM RAT/MIN'    , value: ''},
      { label: 'POS FACT'         , value: ''},
      { label: '% SHOT'           , value: ''},
      { label: '% 3PTSHOT'        , value: ''},
      { label: '% FLD'            , value: ''},
      { label: '% TO'             , value: ''},
      { label: '% PASS'           , value: ''},
      { label: 'OFF REB RAT'      , value: ''},
      { label: 'DEF REB RAT'     , value: ''},
      { label: 'TOT REB RAT'    , value: ''},
      { label: '% FOUL'       , value: ''},
      { label: '% ST'         , value: ''},
      { label: '% BS'         , value: ''},
      { label: 'MIN/G'        , value: ''},
      { label: 'FGM/G'        , value: ''},
      { label: 'FGA/G'        , value: ''},
      { label: '3PT FGM/G'    , value: ''},
      { label: '3PT FGA/G'    , value: ''},
      { label: 'FTM/G'        , value: ''},
      { label: 'FTA/G'        , value: ''},
      { label: 'OFF REB/G'    , value: ''},
      { label: 'DEF REB/G'    , value: ''},
      { label: 'TOT REB/G'    , value: ''},
      { label: 'AST/G'      , value: ''},
      { label: 'PF/G'       , value: ''},
      { label: 'ST/G'       , value: ''},
      { label: 'TO/G'       , value: ''},
      { label: 'BS/G'       , value: ''},
      { label: 'FGM/MIN'    , value: ''},
      { label: 'FGA/MIN'      , value: ''},
      { label: '3PT FGM/MIN'   , value: ''},
      { label: '3PT FGA/MIN' , value: ''},
      { label: 'FTM/MIN'    , value: ''},
      { label: 'FTA/MIN'      , value: ''},
      { label: 'OFF REB/MIN'    , value: ''},
      { label: 'DEF REB/MIN'    , value: ''},
      { label: 'TOT REB/MIN'   , value: ''},
      { label: 'AST/MIN'    , value: ''},
      { label: 'PF/MIN'     , value: ''},
      { label: 'ST/MIN'     , value: ''},
      { label: 'TO/MIN'     , value: ''},
      { label: 'BS/MIN'     , value: ''},
      { label: 'PTS/MIN'    , value: ''},
      { label: 'AGE'        , value: ''},
   ]

  getfieldData1(element){
    this.sort1a = element
   }

  getfieldData2(element){
   this.sort2a = element
   }

  getfieldData3(element){
   this.sort3a = element
   }

  getfieldData4(element){
   this.sort4a = element
   }

  getErase(element){
     this.sorty = element
   }

  getfieldData(element){
    console.log(element)
    this.sort1 = element.value
  }

  getfieldDataa1(element){
    this.sort2 = element.value
  }

  getfieldDataa2(element){
    this.sort3 = element.value
  }

  getfieldDataa3(element){
    this.sort4 = element.value
  }

  filterPly(){ // Local Filter
    for(let item of this.databaseTeamData){
      if(item.playoffs.trim() == "ply"){
        this.tempData.push(item)
        this.tempTeamData.push(item.playoffs);
      }
    }
    this.databaseTeamData = this.tempData;
    // console.log(this.tempData)
    this.model.data="";
  }
  filterReg(){ // Local Filter
    for(let item of this.databaseTeamData){
        if(item.playoffs.trim() == "reg"){
          this.tempData.push(item)
          this.tempTeamData.push(item.playoffs);
        }
    }
    this.databaseTeamData = this.tempData
    // console.log(this.tempData)
    this.model.data="";
  }

  sort(){
    this.databaseData = [];    
    this.getStaticsDatabase();
    this.display7 = false;    
  }


  tfclick(e){
    if(e == 'no'){
      this.fieldModel.sort1 = ''
      this.fieldModel.sort2 = ''
      this.fieldModel.sort3 = ''
      this.fieldModel.sort4 = ''
      this.radiofieldModel  = {
        sort1a: 'true',
        sort2a: 'true',
        sort3a: 'true',
        sort4a: 'true',
      }   
    }
    if(e == 'yes'){
      this.fieldModel6 = {
        item: 'yes'
      }
    }
  }

  ftclick(e){
    if(e == 'no'){
      this.fieldModel5 = {
        item: 'no'
      }
    }
  }


    onScroll(){
      setTimeout(() => {
        this.startPoint += 50;
        this.lengthPoint += 50 ;
        this.getStaticsDatabase();
      }, 500);
    }
    
    onScrollTeam(){
      setTimeout(() => {
        this.startPointTeam += 50;
        this.lengthPointTeam += 50 ;
        console.log(this.lengthPointTeam)
        this.getStaticsDatabaseTeam();
      }, 500);
    }
    

    findNew(){
      if(this.databaseData && this.databaseData.length > 0){
      $('.ui-table-scrollable-body').animate({
        scrollTop: $("#0").offset().top -300
      }, 10)
      for(let i = 0; i< this.allData.length;i++){       
          if(this.findInput.data != this.finValue){            
            console.log(this.findInput.data,this.finValue)
            let findDataIndex = this.databaseData.findIndex(
              item =>
                item[this.allData[i].field_name] !=null && 
                item[this.allData[i].field_name].toString().includes(this.findInput.data)            
              );
              console.log(findDataIndex)
            if(findDataIndex != -1){       
                this.findData = findDataIndex   
                console.log(this.findData)
                setTimeout(()=>{
                  $('.ui-table-scrollable-body').animate({
                    scrollTop: $("#"+this.findData).offset().top -300
                  }, 100) 
                },100)               
              break;
              }
                
        }else{
            let findDataIndex = this.databaseData.findIndex(
              (item,index) =>
                index > this.findData &&
                item[this.allTeamData[i].field_name] !=null && 
                item[this.allTeamData[i].field_name].toString().includes(this.findInput.data)          
              );
            if(findDataIndex != -1){            
                this.findData = findDataIndex ;
                console.log(this.findData)
                setTimeout(()=>{
                  $('.ui-table-scrollable-body').animate({
                    scrollTop: $("#"+this.findData).offset().top -300
                  }, 100) 
                },100)  
              break;
            }     
          }
          
      if(i == 83){
        alert("Text not found")
      }
      }      
      this.finValue = this.findInput.data;
    }   else if(this.databaseTeamData && this.databaseTeamData.length > 0){
      $('.ui-table-scrollable-body').animate({
        scrollTop: $("#0").offset().top -300
      }, 10)
      for(let i = 0; i< this.allTeamData.length;i++){       
          if(this.findInput.data != this.finValue){            
            console.log(this.findInput.data,this.finValue)
            let findDataIndex = this.databaseTeamData.findIndex(
              item =>
                item[this.allTeamData[i].field_name] !=null && 
                item[this.allTeamData[i].field_name].toString().includes(this.findInput.data)            
              );
              console.log(findDataIndex)
            if(findDataIndex != -1){       
                this.findData = findDataIndex   
                console.log(this.findData)
                setTimeout(()=>{
                  $('.ui-table-scrollable-body').animate({
                    scrollTop: $("#"+this.findData).offset().top -300
                  }, 100) 
                },100)               
              break;
              }
                
        }else{
            let findDataIndex = this.databaseTeamData.findIndex(
              (item,index) =>
                index > this.findData &&
                item[this.allTeamData[i].field_name] !=null && 
                item[this.allTeamData[i].field_name].toString().includes(this.findInput.data)          
              );
            if(findDataIndex != -1){            
                this.findData = findDataIndex ;
                console.log(this.findData)
                setTimeout(()=>{
                  $('.ui-table-scrollable-body').animate({
                    scrollTop: $("#"+this.findData).offset().top -300
                  }, 100) 
                },100)  
              break;
            }     
          }
          
      if(i == 83){
        alert("Text not found")
      }
      }      
      this.finValue = this.findInput.data;
    }


    }  




  // showOnlySelected() {
  //   console.log(this.selectedRows)
  //   if (this.selectedRows.length > 0) {
  //     console.log(this.selectedRows)
  //     this.databaseData = this.selectedRows;
  //     this.selectedRows = [];
  //     this.all_Color = false;
  //   } else {
  //     alert('No records select');
  //   }
  // }
  // deleteSelected() {
  //   if (this.selectedRows.length > 0) {
  //     // for (let select of this.selectedRows) {
  //       let deleteItem = this.databaseData.indexOf(this.selectedRows[0]);
  //       if (deleteItem > -1) {
  //         this.databaseData.splice(deleteItem, this.selectedRows.length);
  //       }
  //     // }

  //     console.log(this.selectedRows);
  //     this.selectedRows = [];
  //     this.all_Color = false;
  //   } else {
  //     alert('No records select');
  //   }
  // }

  showOnlySelected() {
    if(this.databaseTeamData != undefined){
      // this.databaseData = []
      if (this.selectedRows.length > 0) {
        this.databaseTeamData = this.selectedRows;
        this.selectedRows = [];
        this.all_Color = false;
      } else {
        alert('No records select');
      }
    }
    else if(this.databaseData != undefined ){
      // this.databaseTeamData =[]
      if (this.selectedRows.length > 0) {
        this.databaseData = this.selectedRows;
        this.selectedRows = [];
        this.all_Color = false;
      } else {
        alert('No records select');
      }
    }    
  }

  deleteSelected() {
    if(this.databaseTeamData != undefined){
      if (this.selectedRows.length > 0) {
          let deleteItem = this.databaseTeamData.indexOf(this.selectedRows[0]);
          if (deleteItem > -1) {
            this.databaseTeamData.splice(deleteItem, this.selectedRows.length);
          }
        console.log(this.selectedRows);
        this.selectedRows = [];
        this.all_Color = false;
      }else {
        alert('No records select');
       }
    }else if(this.databaseData != undefined) {
      if (this.selectedRows.length > 0) {
        let deleteItem = this.databaseData.indexOf(this.selectedRows[0]);
        if (deleteItem > -1) {
          this.databaseData.splice(deleteItem, this.selectedRows.length);
        }
      console.log(this.selectedRows);
      this.selectedRows = [];
      this.all_Color = false;
      } else {
        alert('No records select');
      }
    }
  }
  
  commonHeaderFunction(){
    this.scrollableCols = [];
    let i = 0;
    for (let item of this.allData){
      if(i > 2){
        let obj = { header  : item.field_description,
                    title1  : item.title1,
                    title2  : item.title2,
                    title3  : item.title3,
                    title4  : item.title4,
                    field   : item.field_name, 
                    width   : item.width*10,
                    hideData: item.hideData
        };
        this.scrollableCols.push(obj)
      }
      i++
    }
  }
  
  commonHeaderTeamFunction(){
    this.scrollableCols = [];
    let i = 0;
    for (let item of this.allTeamData){
      if(i > 1){
        let obj = { header  : item.field_description,
                    title1  : item.title1,
                    title2  : item.title2,
                    title3  : item.title3,
                    title4  : item.title4,
                    field   : item.field_name, 
                    width   : item.width*10,
                    hideData: item.hideData
        };
        this.scrollableCols.push(obj)
      }
      i++
    }
  }

// allyellowall(){
//   this.selectedRows = this.databaseData;
//   this.all_Color = true
// }

allyellowall(){
  if(this.databaseData && this.databaseData.length > 0){
    this.selectedRows = this.databaseData;
    this.all_Color = false
  } else if(this.databaseTeamData && this.databaseTeamData.length > 0){
    this.selectedRows = this.databaseTeamData;
    this.all_Color = false
  }
}

setColor(){
  console.log(this.firSetColor,this.secSetColor)
  this.firSetColorOn = this.firSetColor;
  this.secSetColorOn = this.secSetColor;
  this.display14 = false;
  this.setColorChange();
}

subTotal(){
  this.subtotal= "teamname";
}

// columnAttribute(i,item){
//   this.clickAttribute = i; 
//   this.takeValue  = item.field_description;
//   this.symbols.push(this.takeValue)

//   console.log(this.field_Name_Title)
  
//   let add:any = {
//     field_description: this.field_Name_Title,
//     field_name: "",
//     field_type: "",
//     order1: "86",
//     precision1: "0",
//     title1: '',
//     title2: "",
//     title3: "",
//     title4: "",
//     width: "6",      
//   }
//   this.allData.push(add)
//   console.log(this.allData)  
// }

columnAttribute(i,item){
  this.clickAttribute = i; 
  this.takeValue = item.field_description;
  this.symbols.push(this.takeValue)
}

calculator(x){
  this.symbols.push(x)
}

test(){
  if(this.symbols == [] || this.takeValue == null){
    alert("Expected expression")
    alert("You must provide a field name")
  }
  else if(this.field_Name_Input == ""){
   alert("You must provide a field name")
  }
  else if(this.field_Name_Title == ""){
    alert("You must provide a title name")
  }
 
  let add:any = {
    field_description: this.field_Name_Title,
    field_name: "",
    field_type: "",
    order1: "86",
    precision1: "0",
    title1: '',
    title2: "",
    title3: "",
    title4: "",
    width: "6",      
  }
  this.allData.push(add)
  console.log(this.allData)
  if(this.field_Name_Title.length > 0){
    this.display5 = false;
  }  
  
}

}
