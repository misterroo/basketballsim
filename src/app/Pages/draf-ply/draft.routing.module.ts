import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HeaderComponent } from '../header/header.component';
import { DraftPlayerComponent } from './draft-player/draft-player.component';
import { SortableBoxScoreComponent } from './sortable-box-score/sortable-box-score.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'draftplayer', component: DraftPlayerComponent },
{ path: 'sortableboxscore', component: SortableBoxScoreComponent },
// { path: 'header', component: HeaderComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DraftRoutingModule { }
