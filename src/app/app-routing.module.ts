import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './Pages/header/header.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard3/singlegamecomponent', pathMatch: 'full' },
  { path: 'header', component: HeaderComponent},
  {path:'dashboard4',loadChildren: () => import('./Pages/play-with/single-game/single-game.component')},
  
  {path:'dashboard',loadChildren: () => import('./Pages/dash-board/dash-board.module').then(m => m.DashBoardModule)},
  {path:'dashboard1',loadChildren: () => import('./Pages/change-chara/change-chara.module').then(m => m.ChangeCharaModule)},
  {path:'dashboard2',loadChildren: () => import('./Pages/draf-ply/draf-ply.module').then(m => m.DrafPlyModule)},
  {path:'dashboard3',loadChildren: () => import('./Pages/play-with/play-with.module').then(m => m.PlayWithModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
