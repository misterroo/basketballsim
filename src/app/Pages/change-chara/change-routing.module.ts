import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HeaderComponent } from '../header/header.component';
import { ChangePlayerCharacteristicsComponent } from './change-player-characteristics/change-player-characteristics.component';
import { RawBoxScoresComponent } from './raw-box-scores/raw-box-scores.component';
import { RawStatsComponent } from './raw-stats/raw-stats.component';
import { SortableStatsComponent } from './sortable-stats/sortable-stats.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'changeplayercharacteristics', component: ChangePlayerCharacteristicsComponent},
{ path: 'rowboxscores', component: RawBoxScoresComponent },
{ path: 'rowstats', component: RawStatsComponent },
{ path: 'sortablestats', component: SortableStatsComponent },
// { path: 'header', component: HeaderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeRoutingModule { }
