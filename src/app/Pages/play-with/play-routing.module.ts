import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvancedSettingQtrTableComponent } from './advanced-setting-qtr-table/advanced-setting-qtr-table.component';
import { PlayWithAllTeamsComponent } from './play-with-all-teams/play-with-all-teams.component';
import { SingleGameComponent } from './single-game/single-game.component';

import { SubstitutionPatternComponent } from './substitution-pattern/substitution-pattern.component';
import { SubstitutionPatternSingleGameComponent } from './substitution-pattern-single-game/substitution-pattern-single-game.component';
import { SortableStatsComponent } from './sortable-stats/sortable-stats.component';
import { ChangePlayerCharacteristicsComponent } from './change-player-characteristics/change-player-characteristics.component';
import { RawBoxScoresComponent } from './raw-box-scores/raw-box-scores.component';
import { RawStatsComponent } from './raw-stats/raw-stats.component';
import { SortableBoxScoreComponent } from './sortable-box-score/sortable-box-score.component';
import { DraftPlayerComponent } from './draft-player/draft-player.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'playwithallteam', component: PlayWithAllTeamsComponent },
{ path: 'advancedsettingqtrtable', component: AdvancedSettingQtrTableComponent },
{ path: 'singlegamecomponent', component: SingleGameComponent },

{ path: 'substitutionpattern', component: SubstitutionPatternComponent },
// { path: 'substitutionpatternsinglegame', component: SubstitutionPatternSingleGameComponent },
{ path: 'changeplayercharacteristics', component: ChangePlayerCharacteristicsComponent},
{ path: 'rowboxscores', component: RawBoxScoresComponent},
{ path: 'rowstats', component: RawStatsComponent},
{ path: 'sortablestats', component: SortableStatsComponent},
{ path: 'sortableboxscore', component: SortableBoxScoreComponent},
{ path: 'draftplayer', component: DraftPlayerComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
