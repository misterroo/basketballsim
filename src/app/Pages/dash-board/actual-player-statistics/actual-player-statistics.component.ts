import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../../../services/admin.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actual-player-statistics.component',
  templateUrl: './actual-player-statistics.component.html',
  styleUrls: ['./actual-player-statistics.component.scss']
})
export class ActualPlayerStatisticsComponent implements OnInit {
  selectedIndex: number = null;
  selectedIndexTeam: number = null;
  resultLeagues: any;
  resultTeams: any;
  resultPlayer: any;
  showTable: boolean;
  getLeaguesData: any;
  getTeamsData: any;
  teamName: string;
  getTableData: [];
  leagueName: string;
  constructor(
    private router:Router,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private notifierService: NotifierService,
  ) {
    this.showTable = false;
    this.getLeaguesData = [];
    this.getTeamsData = [];
    this.teamName = '';
    this.leagueName = '';
    this.getTableData = [];
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('userToken'))
    if(!localStorage.getItem('userToken')){
      this.router.navigateByUrl('/');
    }

    this.leagueList();
  }
  async leagueList() {
    const Token: string = localStorage.getItem('userToken');
    this.spinner.show();
    (await this.adminService.get_season(Token)).subscribe(result => {
      this.resultLeagues = result;
    }, // (err) => console.log(err),

    (err) =>{ this.spinner.hide();
      if(err.status == 401){
        localStorage.clear();
        this.router.navigateByUrl('/');
        this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
      }
    },

      () => {
        if (this.resultLeagues.status === 'true' || this.resultLeagues.status === true) {
          this.spinner.hide();
          console.log(this.resultLeagues.data);
          this.getLeaguesData = this.resultLeagues.data;
        } else {
          this.spinner.hide();
        }
      });
  }
  selectLeague(league, index) {
    this.selectedIndex = index;
    this.selectedIndexTeam = null;
    this.teamName = '';
    this.leagueName = league.league_name;
    this.getTableData = [];
    this.teamList(league.league_name);
  }
  async teamList(leagename: string) {
    const Token: string = localStorage.getItem('userToken');
    this.spinner.show();
    (await this.adminService.get_team(leagename, Token)).subscribe(result => {
      this.resultTeams = result;
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
        if (this.resultTeams.status === 'true' || this.resultTeams.status === true) {
          this.getTeamsData = this.resultTeams.data;
        } else {
          this.notifierService.notify('error', this.resultTeams.message);
        }
      });
  }


  selectTeam(team, index) {
    this.selectedIndexTeam = index;
    this.teamName = team.teams;
    const req = {
      apikey: 'Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A',
      league_name: this.leagueName,
      team_name: this.teamName
    };
    this.getPlayerList(req);
  }


  async getPlayerList(request) {
    const Token: string = localStorage.getItem('userToken');
    this.spinner.show();
    (await this.adminService.actualPlayerList(request, Token)).subscribe(result => {
      this.resultPlayer = result;
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
        if (this.resultPlayer.status === 'true' || this.resultPlayer.status === true) {
          this.getTableData = this.resultPlayer.data;
        } else {
          this.notifierService.notify('error', this.resultPlayer.message);
        }
      }); 
  }
}
