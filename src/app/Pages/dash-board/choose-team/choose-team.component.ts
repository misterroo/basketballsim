import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-choose-team',
  templateUrl: './choose-team.component.html',
  styleUrls: ['./choose-team.component.scss']
})
export class ChooseTeamComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('userToken'))
    if(!localStorage.getItem('userToken')){
      this.router.navigateByUrl('/');
    }

    // console.log(localStorage.getItem('userToken'))
    $(document).ready(function () {
      $(".overlay").hover(
        function () {
          // console.log("**");
          $(".text_size").addClass("display");
        },
        function () {
          $(".text_size").removeClass("display");
        }
      );

      $(".overlay1").hover(
        function () {
          // console.log("**");
          $(".text_size1").addClass("display");
        },
        function () {
          $(".text_size1").removeClass("display");
        }
      );
    });
    
  }
  goToTeam(status) {
    localStorage.setItem('showStatus', status);
    this.router.navigate(['/dashboard3/playwithallteam']);
  }
}
