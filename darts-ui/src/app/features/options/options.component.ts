import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  gameType: string = "";
  gameTitle: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const gameName = this.route.snapshot.paramMap.get('game');
    if (gameName) {
      this.gameTitle = gameName;
    }
  }

  startTeam(){
    this.gameType = 'team';
    }
    
      start() {
        this.gameType = 'individual';
      }

      
  enableQuickStart(gameType : string) {

  }

}
