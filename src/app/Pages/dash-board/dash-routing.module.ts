import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HeaderComponent } from '../header/header.component';
import { ActualPlayerStatisticsComponent } from './actual-player-statistics/actual-player-statistics.component';
import { BasketBallDatabaseComponent } from './basket-ball-database/basket-ball-database.component';
import { ChooseMyTeamComponent } from './choose-my-team/choose-my-team.component';
import { ChooseTeamComponent } from './choose-team/choose-team.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
{ path: '', component: DashboardComponent },
{ path: 'basketballdatabasecomponent', component: BasketBallDatabaseComponent },
{ path: 'actualplayer', component: ActualPlayerStatisticsComponent },
{ path: 'chooseteam', component: ChooseTeamComponent },
{ path: 'choosemyteam', component: ChooseMyTeamComponent },
// { path: 'header', component: HeaderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRoutingModule { }
