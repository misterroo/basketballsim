import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../../../services/admin.service';
import { NotifierService } from 'angular-notifier';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-raw-stats',
  templateUrl: './raw-stats.component.html',
  styleUrls: ['./raw-stats.component.scss']
})
export class RawStatsComponent implements OnInit {
  model: any = {
    'season': '',
    'opponent': '',
    'team':'',
    'gameNumber': ''
  }
  rawStatedata;

  selectedValue: any;
  seasonValue: any;
  result: any;
  teamData: any = [];
  seasonData: any = [];
  opponentData: any = [];
  teamValue: any;
  leag_name = '';
  finding:any;
findI:any;
findInput:any = {data:''};

find:any;
display4: boolean = false;
display: boolean = false;

finarr =[]
toScrollInto = 0
  selectedValuestand: any;
  oneononeData;
  allTheTeams;

  constructor(
    private router: Router,
    private _location : Location,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private notifierService: NotifierService,
  ) { 
    this.oneononeData = localStorage.getItem('showStatus');
    this.allTheTeams = localStorage.getItem('showStatus');
    this.leag_name = localStorage.getItem('SeasonName');
  }


  selectDropdown: any = [
    { label: 'Stats Section', value: '', },
    { label: 'Team Season Totals', value: '' },
    { label: 'Team Statistics per Game', value: '' },
    { label: 'Team Points per Possession', value: '' },
    { label: 'Team Scoring per Game', value: '' },
    { label: 'Final league Totals', value: '' },
    { label: 'Final OVERALL League Standings', value: '' },
    { label: 'League Leaders', value: '' },
    { label: 'Fantasy Points', value: '' },
    { label: 'Find', value: '' },
  ];


  getData(event) {
    this.selectedValuestand = event.label
    if (this.selectedValuestand == 'Final OVERALL League Standings') {

      let name = this.rawStatedata.findIndex(({ textlines }) => textlines.includes(this.selectedValuestand));
      // console.log("abbac",name)
      if (name) {
        const yOffset = -280;              //-100;
        const element = document.getElementById(name);
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }
    else {
      this.selectedValue = event.label.toUpperCase()
      // console.log(this.selectedValuestand)
      let name = this.rawStatedata.findIndex(({ textlines }) => textlines.includes(this.selectedValue));
      // console.log("abbac",name)
      if (name) {
        const yOffset = -280;        //-100;
        const element = document.getElementById(name);
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }


  }



getDataa(event){
  this.selectedValue = event.label
  if (this.selectedValue == 'Find') {
    this.showDialog4();
    // console.log('find',this.selectedValue)
  }else{
    this.getData(event) 
  }
}


  showDialog4() {
    this.display4 = true;
  }




  ngOnInit(): void {
    // console.log(localStorage.getItem('userToken'))
    if(!localStorage.getItem('userToken')){
      this.router.navigateByUrl('/');
    }

    this.getRawState();

    this.team();
  }
  
  async getRawState() {
    let data = {"apikey":"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A"
   }
    
    const Token: string = localStorage.getItem('userToken');
    // console.log(Token)
    this.spinner.show();
    let resultdata;
    (await this.adminService.rawSate(data ,Token)).subscribe(result => {
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
          for(let item of resultdata.data){
            item['id'] = item.textlines.replace(/ /g,'');
          }
          this.rawStatedata = resultdata.data;
        } else {
          this.notifierService.notify('error', resultdata.message);
        }
      });
  }


  async team() {
    let Token: string = localStorage.getItem('userToken');
    // const formData = new FormData();
    // this.spinner.show();
    let league_name :string = localStorage.getItem('SeasonName');
    (await this.adminService.get_team(league_name, Token)).subscribe(result => {
      this.result = result;
    }, //(err) => console.log(err),

    (err) =>{ 
      // this.spinner.hide();
      if(err.status == 401){
        localStorage.clear();
        this.router.navigateByUrl('/');
        this.notifierService.notify('info', 'Your session has been expired please login again.');

      }
    },

      () => {
        // console.log(this.result)

        if (this.result.status == "true") {
          // this.spinner.hide();
          this.teamData = this.result.data
          let objectName = {
            teams: 'Choose a Team',
            _id: ''
          }
          this.teamData.splice(0, 0, objectName);
        } else {
          // this.spinner.hide();
        }
      })
  }

  getTeamValue(event){
    this.teamValue = event.teams;
    localStorage.setItem('PredictData1', this.teamValue);
    // console.log(event);
 }


 

// getDataa(event) {
//   this.selectedValue = event.label
//   if (this.selectedValue == 'Find') {
//     this.showDialog4();
//   }
// }



  backClicked() {                   
    this._location.back();
  }




  findThe(e) {
    let aary = [];
    let aar = [];
    let name = this.rawStatedata.findIndex(({ textlines }) => textlines.includes(e.teams));
    // console.log("abbac",name)

    if (name) {
      const yOffset = -290;
      const element = document.getElementById(name);
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }


      findNew(){
        let aary = [];
        // console.log(this.find,this.findInput.data)
        let  aar=[];
        let name=  this.rawStatedata.findIndex(({ textlines }) => textlines.toLowerCase().includes(this.findInput.data.toLowerCase()));           
        // console.log('run',name)
        if(name){
                const yOffset =  -280; 
                const element = document.getElementById(name);
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'})
        }
        this.model.data=""
      }


}
