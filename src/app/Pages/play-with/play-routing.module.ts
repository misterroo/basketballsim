import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePlayerCharacteristicsComponent } from 'src/app/Pages/change-chara/change-player-characteristics/change-player-characteristics.component';
import { RawBoxScoresComponent } from 'src/app/Pages/change-chara/raw-box-scores/raw-box-scores.component';
import { RawStatsComponent } from 'src/app/Pages/change-chara/raw-stats/raw-stats.component';
// import { HeaderComponent } from '../header/header.component';
import { AdvancedSettingQtrTableComponent } from './advanced-setting-qtr-table/advanced-setting-qtr-table.component';
import { PlayWithAllTeamsComponent } from './play-with-all-teams/play-with-all-teams.component';
import { SingleGameComponent } from './single-game/single-game.component';
import { SubstitutionPatternComponent } from './substitution-pattern/substitution-pattern.component';
// import { ToggleButtonComponent } from './toggle-button-component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'playwithallteam', component: PlayWithAllTeamsComponent },
{ path: 'advancedsettingqtrtable', component: AdvancedSettingQtrTableComponent },
{ path: 'substitutionpattern', component: SubstitutionPatternComponent },
{ path: 'singlegamecomponent', component: SingleGameComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
