import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeCharaModule } from './Pages/change-chara/change-chara.module';
import { DashBoardModule } from './Pages/dash-board/dash-board.module';
import { DrafPlyModule } from './Pages/draf-ply/draf-ply.module';
import { HeaderComponent } from './Pages/header/header.component';
import { PlayWithModule } from './Pages/play-with/play-with.module';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'header', component: HeaderComponent},
  {path:'dashboard',loadChildren: () => import('./Pages/dash-board/dash-board.module').then(m => m.DashBoardModule)},
  {path:'dashboard1',loadChildren: () => import('./Pages/change-chara/change-chara.module').then(m => m.ChangeCharaModule)},
  {path:'dashboard2',loadChildren: () => import('./Pages/draf-ply/draf-ply.module').then(m => m.DrafPlyModule)},
  {path:'dashboard3',loadChildren: () => import('./Pages/play-with/play-with.module').then(m => m.PlayWithModule)},
  // { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
