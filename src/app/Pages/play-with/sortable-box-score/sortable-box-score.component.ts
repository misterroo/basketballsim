import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../../../services/admin.service';
import { NotifierService } from 'angular-notifier';
import { element } from 'protractor';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sortable-box-score',
  templateUrl: './sortable-box-score.component.html',
  styleUrls: ['./sortable-box-score.component.scss']
})
export class SortableBoxScoreComponent implements OnInit {
  model: any = { data: '' }
  fieldModel:any = {data:''}

  fieldModell:any = {data:''}
  fieldModelll:any = {data:''}
  fieldModellll:any = {data:''}

  fieldModel1:any ={item:''}
  fieldModel2:any ={item:''}
  fieldModel3:any ={item:''}
  fieldModel4:any ={item:''}
  fieldModel5:any ={item:''}

  sorty:any ={item:''}  
  sortn:any ={item:''}
  sortyItem:any;
  sortnItem:any;

  sortPlayerId:any;
  sortTeamId:any;


  limitModelMin:any = {min:'',max:''}
  limitModelMax:any = {item:''}
  //limitModelMax:any = {data:''}
  
  playerData;
  playerTeam:any=[];
  selectedItem = { key: '',selectedKey: ''};
  team_name;
  gameData;
  resultTeams:any;
  getTeamsData:any;
  selectedName:any =[];
  selectedName1:any =[];
  playerDataSort:any = [];
  showSelectPlayer: boolean = false;
  newPlayerData: any;
  currentSortOrder: any;  
  currentSortValue: any;

  sortingItem: any;
  asenItem: any;
  desItem: any;
 
  limitItem: any;
  selectlisthe:any;

  frozenCols: any[];
  scrollableCols: any[];
  
  leag_name = '';
  oneononeData;
  allTheTeams;


  
  constructor(
    private router: Router,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private _location: Location,   
    private notifierService: NotifierService,
  ) {
    this.oneononeData = localStorage.getItem('showStatus');
    this.allTheTeams = localStorage.getItem('showStatus');
    this.leag_name = localStorage.getItem('SeasonName');


    this.scrollableCols = [
      { field: 'away_team', header: 'OPP', width: 150 },
      { field: 'player_name', header: 'PLAYER', width: 130 },
      { field: 'minutes', header: 'MIN', width: 80 },
      { field: 'fgm', header: 'FGM', width: 80 },
      { field: 'fga', header: 'FGA', width: 80 },
      { field: 'three_pfgm', header: '3PT FGM', width: 120 },
      { field: 'three_pfgm', header: '3PT FGA', width: 120 },
      { field: 'ftm', header: 'FTM', width: 80 },
      { field: 'fta', header: 'FTA', width: 80 },
      { field: 'oreb', header: 'OFF REB', width: 120 },
      { field: 'dreb', header: 'DFF REB', width: 120 },
      { field: 'treb', header: 'TOT REB', width: 120 }, // 16 --
      { field: 'ast', header: 'AST', width: 80 },
      { field: 'pf', header: 'PF', width: 80 },
      { field: 'st', header: 'ST', width: 80 },
      { field: 'to1', header: 'TO', width: 80 }, //20
      { field: 'bs', header: 'BS', width: 80 },
      { field: 'points', header: 'PTS', width: 80 },
      { field: 'passes_thr', header: 'TEAM SCORE', width: 120 },
      { field: 'passes_rec', header: 'OPP SCORE', width: 120 },
      { field: 'aosf_fgm', header: 'Qtr1', width: 80 },
      { field: 'times_fouled_aosf', header: 'Qtr2', width: 80 },
      { field: 'times_fouled_nsf', header: 'Qtr3', width: 80 },
      { field: 'times_fouled_all', header: 'Qtr4', width: 80  },
    ];

    this.frozenCols = [
      { field: 'game_number', header: 'GAME', width: 100  },
      { field: 'home_team', header: 'TEAM', width: 150  },
    ];

   }




  selectDropdown: any = [
    // { label: 'SELECT/SORT OPTIONS', value: '', },
    { label: 'LIMIT', value: '' },
    { label: 'SELECT PLAYERS', value: '' },
    { label: 'SORT', value: '' },
    { label: 'SELECT TEAM', value: '' }
  ];
  sortdropdown: any = [
    { label: 'NONE', value: '' },
    { label: 'GAME', value: '' },
    { label: 'TEAM', value: '' },
    { label: 'OPP', value: '' },
    { label: 'PLAYER', value: '' },
    { label: 'MIN', value: '' },
    { label: 'FGM', value: '' },
    { label: 'FGA', value: '' },
    { label: '3PT FGM', value: '' },
    { label: '3PT FGA', value: '' },
    { label: 'FTM', value: '' },
    { label: 'FTA', value: '' },
    { label: 'OFF REB', value: '' },
    { label: 'DEF REB', value: '' },
    { label: 'TOT REB', value: '' },
    { label: 'AST', value: '' },
    { label: 'PF', value: '' },
    { label: 'ST', value: '' },
    { label: 'TO', value: '' },
    { label: 'BS', value: '' },
    { label: 'PTS', value: '' },
    { label: 'TEAM SCORE', value: '' },
    { label: 'OPP SCORE', value: '' },
    { label: 'QTR1', value: '' },
    { label: 'QTR2', value: '' },
    { label: 'QTR3', value: '' },
    { label: 'QTR4', value: '' },

  ]


  selectlist: any = [       // array of object   // limit ka 
    { label: 'GAME', value: 'game_number', },
    { label: 'TEAM', value: 'home_team' },
    { label: 'OPP', value: 'away_team' },
    { label: 'PLAYER', value: 'player_name' },
    { label: 'MIN', value: 'minutes' },
    { label: 'FGM', value: 'fgm' },
    { label: 'FGA', value: 'fga' },
    { label: '3PT FGM', value: 'three_pfgm' },
    { label: '3PT FGA', value: 'three_pfgm' },
    { label: 'FTM', value: 'ftm' },
    { label: 'FTA', value: 'fta' },
    { label: 'OFF REB', value: 'oreb' },
    { label: 'DFF REB', value: 'dreb' },
    { label: 'TOT REB', value: 'treb' },
    { label: 'AST', value: 'ast' },
    { label: 'PF', value: 'pf' },
    { label: 'TO', value: 'to1' },
    { label: 'BS', value: 'bs' },
    { label: 'PTS', value: 'points' },
    { label: 'TEAM SCORE', value: 'passes_thr' },
    { label: 'OPP SCORE', value: 'passes_rec' },
    { label: 'Qtr1', value: 'aosf_fgm' },
    { label: 'Qtr2', value: 'times_fouled_aosf' },
    { label: 'Qtr3', value: 'times_fouled_nsf' },
    { label: 'Qtr4', value: 'times_fouled_all' },
    
  ];
 
  




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

   let data={"apikey":"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
            "game_number":"ALL"
            }
    this.getSortableBoxScore(data);

      
    // this.getPlayerTeam();   

  }
  getData(event) {
    this.selectedValue = event.label
    // if (this.selectedValue == 'SELECT/SORT OPTIONS') {
    //   this.showDialog0();
    // }
    if (this.selectedValue == 'LIMIT') {
      this.showDialog1();
    }
    if (this.selectedValue == 'SELECT PLAYERS') {
      this.showDialog2();
    }
    if (this.selectedValue == 'SORT') {
      this.showDialog3();
    }
    if (this.selectedValue == 'SELECT TEAM') {
      this.showDialog4();
    }
  }
  backClicked() {                   // 167, 18, 5
    this._location.back();
  }
  



  async getSortableBoxScore(data) {
    const Token: string = localStorage.getItem('userToken');
    this.spinner.show();
    let resultdata;
    (await this.adminService.getSortable(data ,Token)).subscribe(result => {
      resultdata = result;
    }, 

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
          this.playerData = resultdata.data;
          // this.getPlayerName(); 
          
          
          let count = 1;
          

          this.playerData.map((item,index) =>{
            if(index > 0){
              this.playerDataSort.push(item.player_name)
            
              
              this.playerDataSort.sort((a, b) => a < b ? -1 : 1);
              this.playerDataSort = [...new Set(this.playerDataSort)]
              

              this.playerTeam.push(item.away_team)
              if(this.playerData[index - 1] != this.playerData[index]){
                count++;
              }
            }
            item.count = count;
          })
          this.playerTeam = [...new Set(this.playerTeam)]
        } else {
          this.notifierService.notify('error', resultdata.message);
        }
        
          


      });
  }


  onItemChange(value){
    // console.log(" Value is : ", value );
 }

  selectLi(item){        // limit
    for(let item of this.selectlist){
      item.activeRow = false
    }
    this.selectlisthe = item.value
    item.activeRow = true

    
  }

  getlimitData(element){        // limit ka 
    this.limitItem = element
  }

  getlimitData1(element){        // limit ka
    this.limitItem = element
  }
  
   filterLimit(){           // limit ka
     let arr = [];
     for(let item of this.playerData){
       if(item[this.selectlisthe] >= this.limitModelMin.min && item[this.selectlisthe] <= this.limitModelMin.max){
         arr.push(item)
       }
     }
     this.playerData = arr;
     this.display1 = false;                              //  ok click => close
     this.model.data =""
   }





  // selectedNameclick(value, i){
  //   this.sortPlayerId = i

  //   console.log(this.selectedName)
  //   if(this.selectedName.length > 0){
  //     let val = this.selectedName.findIndex(element => element == value)
  //     if(val >= 0 ){
  //       this.selectedName.splice(val,1)
  //     }else{
  //       this.selectedName.push(value)
  //     }
  //   }else{
  //     this.selectedName.push(value) 
  //   }
    

  // }


  selectedNameclick(value,i){

    this.sortPlayerId = i
    if(this.selectedName.length > 0){
      let val = this.selectedName.findIndex(element => element == value)
      if(val >= 0 ){
        this.selectedName.splice(val,1)
      }else{
        this.selectedName.push(value)

      }
    }else{
      this.selectedName.push(value)
    }
   }









  selectedTeamclick(value, i){

    this.sortTeamId = i
    if(this.selectedName1.length > 0){
      let val = this.selectedName1.findIndex(element => element == value)
      if(val >= 0 ){
        this.selectedName1.splice(val,1)
      }else{
        this.selectedName1.push(value)
      }
    }else{
      this.selectedName1.push(value) 
    }
      
  }

  getfieldData(element){            // sorting ka 
    this.sortingItem = element.label

  }
  getfieldDataa1(element){            // sorting ka 
    this.sortingItem = element.label

  }
  getfieldDataa2(element){            // sorting ka 
    this.sortingItem = element.label

  }
  getfieldDataa3(element){            // sorting ka 
    this.sortingItem = element.label

  }






 getfieldData1(element){        // sorting ka 
   this.asenItem = element
 }

 getfieldData2(element){        // sorting ka 
  this.asenItem = element
}

getfieldData3(element){        // sorting ka 
  this.asenItem = element
}

getfieldData4(element){        // sorting ka 
  this.asenItem = element
}
 


getErase(element){
  this.sorty = element
  
}








reset(){

  let data={"apikey":"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
  "game_number":"ALL"
            }
this.getSortableBoxScore(data);
// this.getPlayerTeam();
this.selectedName1 = []
this.selectedName = []
}

filterPlayer(){
  
  let tempData = [];
  let tempPlayerData = [];
  let tempTeamData = []
  for(let item of this.playerData){
    for(let sub of this.selectedName){
      if(item.player_name.trim() == sub.trim()){
        
        tempData.push(item)
        tempPlayerData.push(item.player_name)
        tempTeamData.push(item.away_team)
      }
    }
  }
  this.playerData = tempData
  this.playerDataSort = [...new Set(tempPlayerData)]
  this.playerTeam = [...new Set(tempTeamData)]
  this.display2 = false;                              //  ok click => close
  this.model.data =""

}

filterTeam(){
  let tempData = [];
  let tempPlayerData = [];
  let tempTeamData = []
  for(let item of this.playerData){
    for(let sub of this.selectedName1){
      if(item.away_team.trim() == sub.trim()){
        
        tempData.push(item)
        tempPlayerData.push(item.player_name)
        tempTeamData.push(item.away_team)
      }
    }
  }
  // console.log("temfmmsf",tempTeamData)
  this.playerData = tempData
  this.playerDataSort = [...new Set(tempPlayerData)]
  this.playerTeam = [...new Set(tempTeamData)]
  this.display4 = false;                                    // ok click => close 
  this.model.data =""
  // console.log("playerData_",this.playerData)
  // console.log("playerDatasort",this.playerDataSort)
  // console.log("playerTeam",this.playerTeam)
}


// showbuttonModalDialog() {
//   // this.gameList = this.playGamesMulti;
//   this.showPlayMultiple = true;
// }
cancelMulti() {
  this.showDialog0();

  this.selectedName =[];
  this.selectedName1=[];
  
}










sortyes(){

}

sortNo(){

}







sort(){
  let o = this.asenItem;   
  let v = this.sortingItem;   
  
  let neg = 1;
  let pos = -1;
  if(o == 'Ascending'){
    neg = -1;
    pos = 1;
  }else if(o == 'Descending'){
    neg = 1;                      
    pos = -1;
  }
  
  
  
  this.currentSortOrder = o;
  this.currentSortValue =  v;
  if(v == 'GAME'){
    this.playerData.sort(function(a, b){
      
      
      if( Number(a.game_number) < Number(b.game_number)) { return neg; }
      if(Number(a.game_number) > Number(b.game_number)) { return pos; }
      return 0;
    })
  }
  if(v == 'TEAM'){
    this.playerData.sort(function(a, b){
      if(a['home_team'] < b['home_team']) { return neg; }
      if(a['home_team'] > b['home_team']) { return pos; }
      return 0;
    })
  }
  if(v == 'OOP'){
    this.playerData.sort(function(a, b){
      if(a['away_team'] < b['away_team']) { return neg; }
      if(a['away_team'] > b['away_team']) { return pos; }
      return 0;
    })
  }
  if(v == 'PLAYER'){
  
    this.playerData.sort(function(a, b){
      if(a.player_name < b.player_name) { return neg; }
      if(a.player_name > b.player_name) { return pos; }
      
      return 0;
    })
  }
  // if(v == 'State'){
  //   this.playerData.sort(function(a, b){
  //     if(a.State < b.State) { return neg; }
  //     if(a.State > b.State) { return pos; }
  //     return 0;
  //   })
  // }
  if(v == 'MIN'){
    this.playerData.sort(function(a, b){
      if(Number(a.minutes) < Number(b.minutes)) { return neg; }
      if(Number(a.minutes) > Number(b.minutes)) { return pos; }
      return 0;
    })
  }
  if(v == 'FGM'){
    this.playerData.sort(function(a, b){
      if(Number(a.fgm) < Number(b.fgm)) { return neg; }
      if(Number(a.fgm) > Number(b.fgm)) { return pos; }
      return 0;
    })
  }
  if(v == 'FGA'){
    this.playerData.sort(function(a, b){
      if(Number(a.fga) < Number(b.fga)) { return neg; }
      if(Number(a.fga) > Number(b.fga)) { return pos; }
      return 0;
    })
  }
  if(v == '3PT FGM'){
    this.playerData.sort(function(a, b){
      if(Number(a.three_pfgm) < Number(b.three_pfgm)) { return neg; }
      if(Number(a.three_pfgm) > Number(b.three_pfgm)) { return pos; }
      return 0;
    })
  }
  if(v == '3PT FGA'){
    this.playerData.sort(function(a, b){
      if(Number(a.three_pfgm) < Number(b.three_pfgm)) { return neg; }
      if(Number(a.three_pfgm) > Number(b.three_pfgm)) { return pos; }
      return 0;
    })
  }
  if(v == 'FTM'){
    this.playerData.sort(function(a, b){
      if(Number(a.ftm) < Number(b.ftm)) { return neg; }
      if(Number(a.ftm) > Number(b.ftm)){ return pos; }
      return 0;
    })
  }
  if(v == 'FTA'){
    this.playerData.sort(function(a, b){
      if(Number(a.fta) < Number(b.fta)) { return neg; }
      if(Number(a.fta) > Number(b.fta)) { return pos; }
      return 0;
    })
  }
  if(v == 'OFF REB'){
    this.playerData.sort(function(a, b){
      if(Number(a.oreb) < Number(b.oreb)) { return neg; }
      if(Number(a.oreb) > Number(b.oreb)) { return pos; }
      return 0;
    })
  }
  if(v == 'DEF REB'){
    this.playerData.sort(function(a, b){
      if((a.dreb) < Number(b.dreb)) { return neg; }
      if((a.dreb) > Number(b.dreb)) { return pos; }
      return 0;
    })
  }
  if(v == 'TOT REB'){
    this.playerData.sort(function(a, b){
      if(Number(a.treb) < Number(b.treb)) { return neg; }
      if(Number(a.treb) > Number(b.treb)) { return pos; }
      return 0;
    })
  }
  if(v == 'AST'){
    this.playerData.sort(function(a, b){
      if(Number(a.ast) < Number(b.ast)) { return neg; }
      if(Number(a.ast) > Number(b.ast)) { return pos; }
      return 0;
    })
  }
  if(v == 'PF'){
    this.playerData.sort(function(a, b){
      if(Number(a.pf) < Number(b.pf)) { return neg; }
      if(Number(a.pf) > Number(b.pf)) { return pos; }
      return 0;
    })
  }
  if(v == 'ST'){
    this.playerData.sort(function(a, b){
      if(Number(a.st) < Number(b.st)) { return neg; }
      if(Number(a.st) > Number(b.st)) { return pos; }
      return 0;
    })
  }
  if(v == 'TO'){
    this.playerData.sort(function(a, b){
      if(Number(a.to1) < Number(b.to1)) { return neg; }
      if(Number(a.to1) > Number(b.to1)) { return pos; }
      return 0;
    })
  }
  if(v == 'BS'){
    this.playerData.sort(function(a, b){
      if(Number(a.bs) < Number(b.bs)) { return neg; }
      if(Number(a.bs) > Number(b.bs)) { return pos; }
      return 0;
    })
  }
  if(v == 'PTS'){
    this.playerData.sort(function(a, b){
      if(Number(a.points) < Number(b.points)) { return neg; }
      if(Number(a.points) > Number(b.points)) { return pos; }
      return 0;
    })
  }
  if(v == 'TEAM SCORE'){
    this.playerData.sort(function(a, b){
      if(Number(a.passes_thr) < Number(b.passes_thr)) { return neg; }
      if(Number(a.passes_thr) > Number(b.passes_thr)) { return pos; }
      return 0;
    })
  }
  if(v == 'OPPONENT SCORE'){
    this.playerData.sort(function(a, b){
      if(Number(a.passes_rec) < Number(b.passes_rec)) { return neg; }
      if(Number(a.passes_rec) > Number(b.passes_rec)) { return pos; }
      return 0;
    })
  }
  if(v == 'QTR1'){
    this.playerData.sort(function(a, b){
      if(Number(a.aosf_fgm) < Number(b.aosf_fgm)) { return neg; }
      if(Number(a.aosf_fgm) > Number(b.aosf_fgm)) { return pos; }
      return 0;
    })
  }
  if(v == 'QTR2'){
    this.playerData.sort(function(a, b){
      if(Number(a.times_fouled_aosf) < Number(b.times_fouled_aosf)) { return neg; }
      if(Number(a.times_fouled_aosf) > Number(b.times_fouled_aosf)) { return pos; }
      return 0;
    })
  }
  if(v == 'QTR3'){
    this.playerData.sort(function(a, b){
      if(Number(a.times_fouled_nsf) < Number(b.times_fouled_nsf)) { return neg; }
      if(Number(a.times_fouled_nsf) > Number(b.times_fouled_nsf)) { return pos; }
      return 0;
    })
  }
  if(v == 'QTR4'){
    this.playerData.sort(function(a, b){
      if(Number(a.times_fouled_all) < Number(b.times_fouled_all)) { return neg; }
      if(Number(a.times_fouled_all) > Number(b.times_fouled_all)) { return pos; }
      return 0;
    })
    
  }
  
  this.display3 = false;              // ok click => close
   


  
if(this.fieldModel4.item == 'no'){

  this.fieldModel.data = ''
  this.fieldModell.data = ''
  this.fieldModelll.data = ''
  this.fieldModellll.data = ''


}

this.model.data =""

}

  
  
  
  
  
  
  
  
   //   selecteddropdown(value){
    
  // if(this.sortdropdown.length > 0){
  //   let val = this.sortdropdown.findIndex(element => element.sortdropdown_name == value)

  //   if(val >= 0 ){
  //     this.sortdropdown.splice(val,1)
  //   }else{
  //     this.sortdropdown.push(value)
  //   }
  // }else{
  //   this.sortdropdown.push(value) 
  // }
  

  // }












}
