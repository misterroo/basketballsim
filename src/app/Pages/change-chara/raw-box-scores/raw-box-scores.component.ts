import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../../../services/admin.service';
import { NotifierService } from 'angular-notifier';
import { SharedService } from '../../../services/shared.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import {ButtonModule} from 'primeng/button';

declare var $: any;
declare var jQuery: any;


@Component({
  selector: 'app-raw-box-scores',
  templateUrl: './raw-box-scores.component.html',
  styleUrls: ['./raw-box-scores.component.scss']
})
export class RawBoxScoresComponent implements OnInit {
  rawBoxScore:any = [];
  playerData;
  selectedItem = { key: '',selectedKey: ''};
  find:any;
  findI:any;
  findInput:any = {data:''};
  finarr =[]
  toScrollInto = 0
  checked: boolean = false;
  playerToDataIndex:any;
  playerToData:any;
  selectedPlayerName:string = '';
  comments:any =[];
  getTableData: any = [];
  resultAll: any;
  playbayPlaydata;
  scrollableCols: any[];
  leag_name = '';
  oneononeData;
  allTheTeams;
  searchtext:any;
  one_On:any;
  multi_On:any;
  playdis:any;

  

  constructor( private adminService: AdminService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifierService: NotifierService,
    private shared: SharedService,
    private _location: Location,  
    ) { 
      this.oneononeData = localStorage.getItem('showStatus');
    this.allTheTeams = localStorage.getItem('showStatus');
      this.leag_name = localStorage.getItem('SeasonName');
      this.scrollableCols = [
        { field: 'game_number', header: 'GAME' },
        { field: 'team_name1', header: 'TEAM ' },
        { field: 'team_name2', header: 'OPPONENT' },
      ]


    }

  ngOnInit(): void {
    this.playdis = (localStorage.getItem('keeppbpYN'));
    this.playdis = this.playdis == 'false'? true:false
    console.log(this.playdis)
    console
    if(!localStorage.getItem('userToken')){
      this.router.navigateByUrl('/');
    }

    this.playbayPlaydata = this.shared.getPlayByPlayData()
    if(this.playbayPlaydata.length > 0) {
      this.getRawBoxState(this.playbayPlaydata[0].game_number);
    }
    this.tableDataAllData()
  
    // this.playbayPlaydata = this.shared.getPlayByPlayData()
    // if(this.playbayPlaydata.length > 0) {      
    //   this.getComments(this.playbayPlaydata[0].game_number);
    // }
    // this.getComments(game_number)

  }

   addDiv(id,val){
      if(val == 'single'){
        this.getComments(id.game_number)
        this.rawBoxScore =[]
      }else{
        this.getRawBoxState(id.game_number)
        id.activeRow =true;
        this.comments = [];
          }
        }    

  async tableDataAllData() {
    let Token: string = localStorage.getItem('userToken');

    this.spinner.show();
    (await this.adminService.withoutQtrTable(Token)).subscribe(result => {
      localStorage.setItem('tableDataAllteamData','JSON.stringify(this.pridictData)')
      this.resultAll = result;
    }, (err) => console.log(err),
      () => {
        if (this.resultAll.status === 'true') {
          this.spinner.hide();
          this.getTableData = this.resultAll.data;
          console.log(this.getTableData)
          // this.addDiv(this.getTableData[0]) // first show
        } else {
          this.spinner.hide();
        }
      })
  }

  async getComments(game_number) {

    
    let data = {"apikey":"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
                "game_number":game_number
                }
    
    const Token: string = localStorage.getItem('userToken');
    this.spinner.show();
    let resultdata;
    (await this.adminService.getComments(data ,Token)).subscribe(result => {
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
          this.comments = resultdata.data;
          // this.addDiv(this.comments[0])
        } else {
          this.notifierService.notify('error', resultdata.message);
        }
      });
      // activeRow = true;
  }
  





  async getRawBoxState(game_number) {

    let gameData  = localStorage.getItem('gameData');
    // console.log(typeof gameData);
    // console.log( JSON.parse(gameData));

    let all = 0;   
    JSON.parse(gameData).map(f => {
      all += parseInt(f.predictgames);   
    })

    let data = {"apikey":"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
                "game_number": game_number                  
                }
    
    const Token: string = localStorage.getItem('userToken');
    // console.log(Token)
    this.spinner.show();
    let resultdata;
    (await this.adminService.rawBoxScore(data ,Token)).subscribe(result => {
      resultdata = result;
      // console.log(resultdata)
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
          for(let item of resultdata.data){
            item['id'] = item.text.replace(/ /g,'');
          }
          this.rawBoxScore = resultdata.data;
        } else {
          this.notifierService.notify('error', resultdata.message);
        }
      });
  }
  
  backClicked() {                  
    this._location.back();
  }
 

  findThe(){
    var x = document.getElementsByClassName("searchContent")[1];
    let name=  this.rawBoxScore.findIndex(({ text }) => text.toLowerCase().includes(this.findInput.data.toLowerCase())) 
    
    if(name){ 
            const yOffset =  -50; 
            var myElement = document.getElementById(name);
            var tops = myElement.offsetTop + yOffset;
            document.getElementById('scrollParent').scrollTop = tops;
          }
    
  }



  findTheP(){
    var x = document.getElementsByClassName("ui-scrollpanel-content")[1];
    x.setAttribute("id", "scrollParent")
    let aary = [];
    console.log(this.findInput.data)
    let  aar=[];
    let name=  this.comments.findIndex(({ text }) => text.toLowerCase().includes(this.findInput.data.toLowerCase()));
    console.log('console',name)
    if(name){
            // const yOffset =  -300; 
            // const element = document.getElementById(name);
            var myElement = document.getElementById(name);
            var tops = myElement.offsetTop;
            document.getElementById('scrollParent').scrollTop = tops;
          }
  }

            selectTeamData(e){
              this.playerToData = e.player_name 

              this.getTableData.map(col => {
                col.activeRow = false
              })
              e.activeRow = true;
              this.selectedPlayerName = e.player_name; 
            }
  
        // selectTeamData(e){
        //   this.playerToData = e.player_name 
      
        //   this.getTableData.map(col => {
        //     col.activeRow = false
        //   })
        //   e.activeRow = true;
        //   this.selectedPlayerName = e.player_name; 
        // }

        // selectTeamItem(e){   
        //   this.playbayPlaydata.map(col => {
        //      col.activeRow = false
        //    })
        //    e.activeRow = true;
        //  }


}
