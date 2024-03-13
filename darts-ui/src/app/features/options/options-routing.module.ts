import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { CricketOptionsComponent } from '../games/cricket/cricket-options/cricket-options.component';
import { BonanzaOptionsComponent } from '../games/bonanza/bonanza-options/bonanza-options.component';
import { ThreeOptionsComponent } from '../games/three-o-one/three-options/three-options.component';
import { OptionsComponent } from './options.component';
import { TictactoeOptionsComponent } from '../games/tictactoe/tictactoe-options/tictactoe-options.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'cricket', component: CricketOptionsComponent },
      { path: 'bonanza', component: BonanzaOptionsComponent },
      { path: '301', component: ThreeOptionsComponent },
      { path: 'tictactoe', component: TictactoeOptionsComponent },
      { path: '', component: OptionsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionsRoutingModule { }
