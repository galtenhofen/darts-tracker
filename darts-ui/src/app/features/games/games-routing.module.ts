import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { CricketComponent } from './cricket/cricket.component';
import { ThreeOhOneComponent } from './three-o-one/three-o-one.component';
import { TictactoeComponent } from './tictactoe/tictactoe.component';
import { BonanzaComponent } from './bonanza/bonanza.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'bonanza', component: BonanzaComponent },
     { path: 'cricket', component: CricketComponent },
     { path: '301', component: ThreeOhOneComponent },
     { path: 'tictactoe', component: TictactoeComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
