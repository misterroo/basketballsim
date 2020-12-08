import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';


@Component({
  selector: 'app-choose-my-team',
  templateUrl: './choose-my-team.component.html',
  styleUrls: ['./choose-my-team.component.scss']
})
export class ChooseMyTeamComponent implements OnInit {

  constructor(public router: Router ) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('userToken'))
    if(!localStorage.getItem('userToken')){
      this.router.navigateByUrl('/');
    }

  }
  goToTeam(status) {
    localStorage.setItem('showStatus', status);
    this.router.navigate(['/dashboard3/playwithallteam']);
  }
}
