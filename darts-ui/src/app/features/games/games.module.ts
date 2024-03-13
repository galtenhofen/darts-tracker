import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule as GamesRoutingModule } from './games-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module';
import { TictactoeComponent } from './tictactoe/tictactoe.component';
import { BonanzaComponent } from './bonanza/bonanza.component';
import { ThreeOhOneComponent } from './three-o-one/three-o-one.component';
import { CricketButtonsComponent } from './cricket/cricket-buttons/cricket-buttons.component';
import { CricketStatsComponent } from './cricket/cricket-stats/cricket-stats.component';
import { CricketComponent } from './cricket/cricket.component';


@NgModule({
    imports: [
        CommonModule,
        GamesRoutingModule,
        SharedModule,
        CustomMaterialModule
    ],
    declarations: [
        TictactoeComponent,
        BonanzaComponent,
        ThreeOhOneComponent,
        CricketComponent,
        CricketStatsComponent,
        CricketButtonsComponent
       
    ]
})
export class GamesModule { }
