import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { CricketService } from 'src/app/services/cricket.service';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  @Output() newGameEvent = new EventEmitter<string>();
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  gameTitle: string = "";
  gameName$ = Observable<String>;

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private dataService: CricketService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    // this.gameName$ = this.route.paramMap.pipe(
    //   switchMap(params => {
    //     this.gameTitle = Number(params.get('id'));
    //     return this.service.getHeroes();
    //   })
    // );

    this.titleService.setTitle('Games');
    this.logger.log('Games loaded');
    this.notificationService.openSnackBar('Games loaded');

  }

  chooseGame(gameName:string){
    console.log('The game has been chosen: ', gameName);
    //this.newGameEvent.emit(gameName);
    this.dataService.setGame(gameName);
    this.router.navigate(['/options' , {game: gameName}]);
  }
}
