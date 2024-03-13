import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module';
import { BonanzaOptionsComponent } from '../games/bonanza/bonanza-options/bonanza-options.component';
import { ThreeOptionsComponent } from '../games/three-o-one/three-options/three-options.component';
import { TictactoeOptionsComponent } from '../games/tictactoe/tictactoe-options/tictactoe-options.component';
import { CricketOptionsComponent } from '../games/cricket/cricket-options/cricket-options.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options.component';



@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    SharedModule,
    OptionsRoutingModule
  ],
  declarations: [
    CricketOptionsComponent,
    BonanzaOptionsComponent,
    ThreeOptionsComponent,
    TictactoeOptionsComponent,
    OptionsComponent
  ]
})
export class OptionsModule { }
