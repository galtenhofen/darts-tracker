import { Component, OnInit, HostListener, Input } from '@angular/core';
import { CricketService } from 'src/app/services/cricket.service';
import { UserService } from 'src/app/services/users.service';
import { CricketPlayer } from 'src/app/models/cricket/cricket-player';
import {CricketTeam} from 'src/app/models/cricket/cricket-team';
import {CricketRoundTeam} from 'src/app/models/cricket/cricket-round-team';
import {CricketRound} from 'src/app/models/cricket/cricket-round';
import {CricketGame} from 'src/app/models/cricket/cricket-game';
import { CricketTeamGame } from 'src/app/models/cricket/cricket-team-game';
import {CricketHit} from 'src/app/models/cricket/cricket-hit';
import Swal from 'sweetalert2';
import { CricketSettings } from 'src/app/models/settings/cricket-settings.model';
import UserResponse from 'src/app/models/user/user-response.model';
import { User } from 'src/app/models/user/user.model';
// import { Store, select } from '@ngrx/store';
// import { GameMetaState } from 'src/app/store/game.reducer';
// import { GameMeta } from 'src/app/store/game.actions';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-cricket',
  templateUrl: './cricket.component.html',
  styleUrls: ['./cricket.component.css']
})
export class CricketComponent implements OnInit {
  cricketSettings: CricketSettings | null = null;
  multiplier: number = 1;
  playerOne: CricketPlayer = new CricketPlayer(0,'','');
  playerTwo: CricketPlayer = new CricketPlayer(0,'','');;
  playerThree!: CricketPlayer;
  playerFour!: CricketPlayer;
  availablePlayers: any[]=[];
  homeTeam!: CricketTeam;
  awayTeam!: CricketTeam;
  numPlayers = 0;
  teams: CricketTeam[] = [];
  homeTeamGame!: CricketTeamGame;
  awayTeamGame!: CricketTeamGame;
  firstPlayerGame!: CricketGame;
  secondPlayerGame!: CricketGame;
  currentGame!: CricketGame;
  currentTeamRound!: CricketRoundTeam;
  currentRound!: CricketRound;
  key: any;
  inOrder = false;
  quickStart = true;
  gameStarted : boolean = false;
  playerList: CricketPlayer[] = [];
  playerIdList: number[] = [];
  currentPlayer!: CricketPlayer;
  currentPlayerId!: number;
  playerIterator = 0;
  playerIdIterator = 0;
  roundNumber = 1;
  moreDarts = true;
  showSingles = true;
  showDoubles = false;
  showTriples = false;
  gameType: string = '';


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.key) {
      case '1':
        this.hitSection(20, 'twenty' , this.multiplier);
        break;
      case '2':
        this.hitSection(19,'nineteen', this.multiplier);
        break;
      case '3':
        this.hitSection(18,'eighteen', this.multiplier);
        break;
      case '4':
        this.hitSection(17, 'seventeen',this.multiplier);
        break;
      case '5':
        this.hitSection(16,'sixteen', this.multiplier);
        break;
      case '6':
        this.hitSection(15, 'fifteen',this.multiplier);
        break;
      case '7':
        this.hitSection(25,'bullseye', this.multiplier); // Bullseye
        break;
      case 'n':
        this.onNextPlayer();
        break;
      case '0':
        this.onMiss();
        break;
      case 's':
        this.showSingle();
        break;
      case 'i':
        this.undoTurn();
        break;
      default:
        // Handle other keys if needed
        break;
    }
  }

  constructor(public cricketService: CricketService, public userService: UserService) {
   }

  ngOnInit() {
      this.cricketService.getCurrentCricketOptions().subscribe(data=>{
      console.log('settings: ', data);
      this.cricketSettings = data;
      this.gameType = data.gameType;
      this.playerIdList = data.playerIdList;
      
      this.gameSetup();
    });
  


  }

  gameSetup(){
    if(this.cricketSettings?.gameType==='team'){
       this.buildTeams();
    }
    else {  
      this.retrievePlayers();
     //this.setOrder();
      
    }
  }

  retrievePlayers(){
    if(this.cricketSettings != null){
    for (let i = 0; i < this.cricketSettings.playerIdList.length; i++) {
      this.getUser(this.cricketSettings.playerIdList[i], i+1); 
    }
  }

  }

  getUser(userId: number, playerNumber: number){
    this.userService.getUserById(userId).subscribe({
        next: (response:UserResponse) =>
        {
          if (response.user != undefined){
            console.log('foundUser: ', response.user);
          this.buildPlayer(response.user, playerNumber);
          }
        },
        error: (error: any) => {
          console.error('Error fetching users:', error);
        }
      }
     )
  }

  buildPlayer(user : User, playerNumber: number){
    if (this.cricketSettings != null){
    if (playerNumber === 1){
    this.playerOne = new CricketPlayer(this.cricketSettings.playerIdList[0], user.firstName, user.lastName, undefined);
    this.firstPlayerGame = new CricketGame(this.playerOne);
    this.playerList.push(this.playerOne);
    }
    else {
      this.playerTwo = new CricketPlayer(this.cricketSettings.playerIdList[1], user.firstName, user.lastName, undefined);
      this.secondPlayerGame = new CricketGame(this.playerTwo);
      this.playerList.push(this.playerTwo);
    }
    if(this.playerOne.playerId != 0 && this.playerTwo.playerId != 0){
    this.currentPlayer = this.playerOne;
    this.setOrder();
    }
  }
    console.log('playersList built: ',this.playerList);
  }


  buildTeams(){

  }

  showSingle() {
    this.multiplier = 1;
    this.showSingles = true;
    this.showDoubles = false;
    this.showTriples = false;
  }

  toggleDouble() {
    if (this.showDoubles === true) {
      this.showSingle();
    } else {
      this.multiplier = 2;
      this.showSingles = false;
      this.showDoubles = true;
      this.showTriples = false;
    }
  }

  toggleTriple() {
    if (this.showTriples === true) {
      this.showSingle();
    } else {
      this.multiplier = 3;
      this.showSingles = false;
      this.showDoubles = false;
      this.showTriples = true;
    }
  }

  onNextPlayer() {
    if (this.playerIterator < (this.playerList.length - 1)) {
      this.playerIterator++;
      this.currentPlayer = this.playerList[this.playerIterator];
    }  else {
      this.playerIterator = 0;
      this.currentPlayer = this.playerList[this.playerIterator];
      this.roundNumber++;
    }
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      this.firstPlayerGame.rounds.push(this.currentRound);
    } else
      if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      this.secondPlayerGame.rounds.push(this.currentRound);
    }
    this.moreDarts = true;
    //this.throwNum = 1;
    this.startNewRound();
  }

  finishRound(){
    console.log('filling in ' + this.currentRound.dartsLeft + ' misses');
    if (this.currentRound.dartsLeft > 0){
      for (let i = 0; i <= this.currentRound.dartsLeft+1; i++) {
        this.onMiss();
      }
    }
  }

  skipToNextPlayer() {
    this.undoTurn();
    if (this.playerIterator < (this.playerList.length - 1)) {
      this.playerIterator++;
      this.currentPlayer = this.playerList[this.playerIterator];
    }  else {
      this.playerIterator = 0;
      this.currentPlayer = this.playerList[this.playerIterator];
    }
    this.startNewRound();
  }

  goToPreviousPlayer() {
    this.undoTurn();
    if (this.playerIterator < (this.playerList.length - 1)) {
      this.playerIterator--;
      this.currentPlayer = this.playerList[this.playerIterator];
    }  else {
      this.playerIterator = 0;
      this.currentPlayer = this.playerList[this.playerIterator];
    }
    this.startNewRound();
  }

  startNewRound() {
    console.log('***Enter startNewRound');
    this.currentRound = new CricketRound(this.currentPlayer.playerId);
    console.log('currentRound: ', this.currentRound);
    this.currentGame = this.currentRound.playerId === this.firstPlayerGame.player.playerId ?
      this.firstPlayerGame : this.secondPlayerGame;
    console.log('currentTarget: ', this.currentGame.currentTarget);
    console.log('cricketSettings', this.cricketSettings);
    console.log('currentPlayerId', this.currentPlayer.playerId);
    if (this.cricketSettings != null){
    if(this.cricketSettings.gameType === 'practice' && this.currentPlayer.playerId ===9999){
      this.randomizeTurn();
    }
    }
  }
  
  randomizeTurn(){
    const randomHits = Math.floor(Math.random() * 3);
    console.log('cpu hits '+randomHits+ ' numbers');
    for (let i = 0; i <= randomHits; i++) {
    this.hit(this.currentGame.currentTarget);
    }
    this.onNextPlayer();
    
  }


  startNewTeamRound() {
    this.currentTeamRound = new CricketRoundTeam(this.currentPlayer.playerId, this.currentPlayer.teamId ? this.currentPlayer.teamId : 0);
    console.log('currentTeamRound: ', this.currentTeamRound);
    }
  

    setOrderTeam() {
      this.getPlayerListTeam(this.awayTeamGame, this.homeTeamGame);
      this.currentPlayer = this.playerList[this.playerIterator];
      this.currentPlayerId = this.playerIdList[this.playerIdIterator];
    }
  
    setOrder() {
      console.log('***Enter setOrder');
      // if (this.quickStart === true) {
      //   this.setQuickstartPlayerList();
      // }
      this.currentPlayer = this.playerList[this.playerIterator];
      this.currentPlayerId = this.playerIdList[this.playerIdIterator];
      console.log('currentPlayer', this.currentPlayer);
      console.log('currentPlayer', this.currentPlayerId);
      console.log('this.playerIdList', this.playerIdList);
      //this.cricketService.setGameStart(true);   
      // this.store.dispatch(new GameMeta({isStarted: true}))
      // this.gameStarted$ = this.store.select(state => state.gameMeta);
      // console.log('cricket component OnInIt  gameStarted:', this.gameStarted$.pipe);
      this.startNewRound();
    }

    setQuickstartPlayerList() {
      this.playerList.push(this.firstPlayerGame.player);
      this.playerList.push(this.secondPlayerGame.player);
    }


    getPlayerListTeam(awayTeam: CricketTeamGame, HomeTeam: CricketTeamGame) {
      this.playerList.push(this.awayTeamGame.team.playerOne);
      this.playerList.push(this.homeTeamGame.team.playerOne);
      this.playerList.push(this.awayTeamGame.team.playerTwo);
      this.playerList.push(this.homeTeamGame.team.playerTwo);
    }
  
    // getPlayerList(currentPlayers: any[]) {
    //   console.log('***Enter setPlayerList');
    //     currentPlayers.forEach(function(this: any, item: { firstName: string; lastName: string; playerId: number; }) {
    //     const newPlayer = new CricketPlayer(item.firstName, item.lastName, item.playerId);
    //     this.playerList.push(newPlayer);
    //   });
    //   console.log('this.playerList', this.playerList);
    // }
  
  
  /*onNextTeamPlayer() {
    if (this.playerIterator < 3) {
      this.playerIterator++;
      this.currentPlayer = this.playerList[this.playerIterator];
    }  else {
      this.playerIterator = 0;
      this.currentPlayer = this.playerList[this.playerIterator];
      this.roundNumber++;
    }
    this.moreDarts = true;
      this.throwNum = 1;
    this.startNewTeamRound();
  }

  onPrevTeamPlayer() {
    // const previous = confirm('Do you want to go back to previous player and re-enter their round?');
   // if (previous === true) {
      if (this.playerIterator > 0) {
        this.playerIterator--;
        this.currentPlayer = this.playerList[this.playerIterator];
      } else {
        if (this.roundNumber > 1 ) {
          this.playerIterator = 3;
          this.currentPlayer = this.playerList[this.playerIterator];
          this.roundNumber--;
        }  else {
          alert('This is the first player.');
        }
      }
      this.moreDarts = true;
      this.throwNum = 1;
   // }
}*/

/*
  undoThrow(player: number, num: number, mult: number) {
    console.log('undoThrow: ', player, num, mult);
    if (player === this.firstPlayerGame.player.playerId) {
      if (num === 20) {
        for (let i = 0; i < mult; i++) {
          this.firstPlayerGame.twenties--;
        }
      } else if (num === 19) {
        for (let i = 0; i < mult; i++) {
          this.firstPlayerGame.nineteens--;
        }
      } else if (num === 18) {
        for (let i = 0; i < mult; i++) {
          this.firstPlayerGame.eighteens--;
        }
      } else if (num === 17) {
        for (let i = 0; i < mult; i++) {
          this.firstPlayerGame.seventeens--;
        }
      } else if (num === 16) {
        for (let i = 0; i < mult; i++) {
          this.firstPlayerGame.sixteens--;
        }
      } else if (num === 15) {
        for (let i = 0; i < mult; i++) {
          this.firstPlayerGame.fifteens--;
        }
      } else if (num === 25) {
        for (let i = 0; i < mult; i++) {
          this.firstPlayerGame.bullseyes--;
        }
      }
    } else
      if (player === this.secondPlayerGame.player.playerId) {
        if (num === 20) {
          for (let i = 0; i < mult; i++) {
            this.secondPlayerGame.twenties--;
          }
        } else if (num === 19) {
          for (let i = 0; i < mult; i++) {
            this.secondPlayerGame.nineteens--;
          }
        } else if (num === 18) {
          for (let i = 0; i < mult; i++) {
            this.secondPlayerGame.eighteens--;
          }
        } else if (num === 17) {
          for (let i = 0; i < mult; i++) {
            this.secondPlayerGame.seventeens--;
          }
        } else if (num === 16) {
          for (let i = 0; i < mult; i++) {
            this.secondPlayerGame.sixteens--;
          }
        } else if (num === 15) {
          for (let i = 0; i < mult; i++) {
            this.secondPlayerGame.fifteens--;
          }
        } else if (num === 25) {
          for (let i = 0; i < mult; i++) {
            this.secondPlayerGame.bullseyes--;
          }
        }
      }
  }
  */

    undoSingleThrow(){
      this.currentRound.darts.pop();
     // this.throwNum--;
    }

    undoThrow(player: number, num: number, mult: number) {
    console.log('undoThrow: ', player, num, mult);
    const gameData = player === this.firstPlayerGame.player.playerId ? this.firstPlayerGame : this.secondPlayerGame;
  
    switch (num) {
      case 20:
        gameData.twentyHits -= mult;
        break;
      case 19:
        gameData.nineteenHits -= mult;
        break;
      case 18:
        gameData.eighteenHits -= mult;
        break;
      case 17:
        gameData.seventeenHits -= mult;
        break;
      case 16:
        gameData.sixteenHits -= mult;
        break;
      case 15:
        gameData.fifteenHits -= mult;
        break;
      case 25:
        gameData.bullseyeHits -= mult;
        break;
      default:
        // Handle other cases if needed
        break;
    }
  }

  
  undoTurn() {
    console.log('undo turn: this.currentRound: ',this.currentRound);
    const self = this;
    this.currentRound.darts.forEach(function(item) {
      console.log('throw: ', item.target);
      if (item.target > 0) {
        self.undoThrow(self.currentRound.playerId, item.target, item.multiplier);
      }
      });
      this.currentRound = new CricketRound(this.currentPlayer.playerId);
      //this.throwNum = 1;
      console.log(this.firstPlayerGame);
     
  }


  hit(num : number){
    switch (num) {
      case 20: 
      this.hitSection(20, 'twenty' ,this.multiplier);
      //this.onHit20(this.multiplier);
      break;
      case 19: this.hitSection(19, 'nineteen', this.multiplier);
      break;
      case 18: this.hitSection(18, 'eighteen', this.multiplier);
      break;
      case 17: this.hitSection(17, 'seventeen', this.multiplier);
      break;
      case 16: this.hitSection(16, 'sixteen', this.multiplier);
      break;
      case 15: this.hitSection(15, 'fifteen', this.multiplier);
      break;
      case 25: this.hitSection(25, 'bullseye', this.multiplier);
      break;
    }
  }

  updateMultiplier(num : number){
    console.log('user change multiplier to ' + num);
    this.multiplier = num;
      }


  hitSection(section: number, property: string ,multiplier: number) {
    //this.checkForClosed();
    console.log(`hit ${section}`);
    const hit = new CricketHit(section, multiplier);
    this.currentGame = this.currentRound.playerId === this.firstPlayerGame.player.playerId ?
      this.firstPlayerGame : this.secondPlayerGame;
    const target = this.currentGame.currentTarget;
    const closedProp = `${property}Closed`;
  console.log('section',section);
    if (section === target && this.currentRound.dartsLeft > 0 && !this.currentGame[closedProp]) {
      const sectionProp = `${property}Hits`;
      console.log('sectionProp',sectionProp);
        for (let i = 0; i < multiplier; i++) {
          this.currentGame[sectionProp] = (this.currentGame[sectionProp] as number) + 1;
        }
      this.currentRound.darts.push(hit);
    } else{
      this.onMiss();
    }
  
console.log('hitSection   firstPlayerGame: ', this.firstPlayerGame);
console.log('hitSection   secondPlayerGame: ', this.secondPlayerGame);

    this.processThrow();
  }
  

  onMiss()  {
    console.log('ain\'t hit shit');
    const hit = new CricketHit(0, 0);
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      if (this.currentRound.dartsLeft > 0) {
        this.currentRound.darts.push(hit);
      }
      this.processThrow();
    } else if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      if (this.currentRound.dartsLeft > 0) {
        this.currentRound.darts.push(hit);
      }
      this.processThrow();
    }

    console.log('onMiss currentRound: ', this.currentRound);
  }
/*
  onTeamHit20(multiplier) {
    const hit = new CricketHit(20, multiplier);
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.currentRound.darts.length < 3 && this.awayTeamGame.twentyClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.twenties++;
        }
        this.currentRound.darts.push(hit);

        if (this.awayTeamGame.twenties > 2) {
          this.awayTeamGame.twentyClosed = true;
        }
      }
      this.processThrow();  // kill this
      console.log('Away Team twenties: ', this.awayTeamGame.twenties);
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.currentRound.darts.length <= 3 && this.homeTeamGame.twentyClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.twenties++;
        }
        this.currentRound.darts.push(hit);
        if (this.homeTeamGame.twenties > 2) {
          this.homeTeamGame.twentyClosed = true;
        }
      }
      this.processThrow(); // kill this
      console.log('onHit20 twenties: ', this.homeTeamGame.twenties);
    }

    console.log('onHit20 currentRound: ', this.currentRound);

  }
  onTeamHit19(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.nineteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.nineteens++;

          this.addScore(20);
        }
        if (this.awayTeamGame.nineteens > 2) {
          console.log('You closed the nineteens');
        }
      }
      this.processThrow();
      console.log('Away Team nineteens: ', this.awayTeamGame.nineteens);
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.nineteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.nineteens++;

          this.addScore(20);
        }
        if (this.homeTeamGame.nineteens > 2) {
          console.log('You closed the nineteens');
        }
      }
      this.processThrow();
      console.log('onHit20 nineteens: ', this.homeTeamGame.nineteens);
    }
  }

  onTeamHit18(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.eighteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.eighteens++;

          this.addScore(20);
        }
        if (this.awayTeamGame.eighteens > 2) {
          console.log('You closed the eighteens');
        }
      }
      this.processThrow();
      console.log('Away Team eighteens: ', this.awayTeamGame.eighteens);
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.eighteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.eighteens++;

          this.addScore(20);
        }
        if (this.homeTeamGame.eighteens > 2) {
          console.log('You closed the eighteens');
        }
      }
      this.processThrow();
      console.log('onHit20 eighteens: ', this.homeTeamGame.eighteens);
    }
  }

  onTeamHit17(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.seventeenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.seventeens++;

          this.addScore(20);
        }
        if (this.awayTeamGame.seventeens > 2) {
          console.log('You closed the seventeens');
        }
      }
      this.processThrow();
      console.log('Away Team seventeens: ', this.awayTeamGame.seventeens);
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.seventeenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.seventeens++;

          this.addScore(20);
        }
        if (this.homeTeamGame.seventeens > 2) {
          console.log('You closed the seventeens');
        }
      }
      this.processThrow();
      console.log('onHit20 seventeens: ', this.homeTeamGame.seventeens);
    }
  }
  onTeamHit16(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.sixteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.sixteens++;

          this.addScore(20);
        }
        if (this.awayTeamGame.sixteens > 2) {
          console.log('You closed the sixteens');
        }
      }
      this.processThrow();
      console.log('Away Team sixteens: ', this.awayTeamGame.sixteens);
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.sixteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.sixteens++;

          this.addScore(20);
        }
        if (this.homeTeamGame.sixteens > 2) {
          console.log('You closed the sixteens');
        }
      }
      this.processThrow();
      console.log('onHit20 sixteens: ', this.homeTeamGame.sixteens);
    }
  }
  onTeamHit15(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.fifteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.fifteens++;

          this.addScore(20);
        }
        if (this.awayTeamGame.fifteens > 2) {
          console.log('You closed the fifteens');
        }
      }
      this.processThrow();
      console.log('Away Team fifteens: ', this.awayTeamGame.fifteens);
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.fifteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.fifteens++;

          this.addScore(20);
        }
        if (this.homeTeamGame.fifteens > 2) {
          console.log('You closed the fifteens');
        }
      }
      this.processThrow();
      console.log('onHit20 fifteens: ', this.homeTeamGame.fifteens);
    }
  }
  onTeamHitBullseye(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.bullseyeClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.bullseyes++;

          this.addScore(20);
        }
        if (this.awayTeamGame.bullseyes > 2) {
          console.log('You closed the bullseyes');
        }
      }
      this.processThrow();
      console.log('Away Team bullseyes: ', this.awayTeamGame.bullseyes);
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.bullseyeClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.bullseyes++;

          this.addScore(20);
        }
        if (this.homeTeamGame.bullseyes > 2) {
          console.log('You closed the bullseyes');
        }
      }
      this.processThrow();
      console.log('onHit20 bullseyes: ', this.homeTeamGame.bullseyes);
    }
  }
  onTeamMiss()  {
    const hit = new CricketHit(0, 0);
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.currentRound.darts.length < 3) {
        this.currentRound.darts.push(hit);
        }
      this.processThrows();
      console.log('You suck.');
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.currentRound.darts.length < 3) {
        this.currentRound.darts.push(hit);
      }
      this.processThrows();
      console.log('You suck.');
    }

    console.log('onMiss currentRound: ', this.currentRound);
  }*/

  processThrow() {
    const BiB = this.currentRound.darts.filter(d => d.target > 0 ).length === ((this.currentRound.bib+1)*3); 
    this.currentGame = this.currentRound.playerId === this.firstPlayerGame.player.playerId ?
          this.firstPlayerGame : this.secondPlayerGame;
    if(!this.currentGame.bullseyeClosed){
    if (this.currentRound.dartsLeft > 0) {
    }  
    else if(BiB){
      Swal.fire({
        title: 'Bring it Back',
        text: 'Still '+this.currentPlayer.firstName+'\'s turn.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Undo Turn',
        confirmButtonText: 'Let\'s Go',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          
            this.currentRound.bib++;
            this.moreDarts = true;
            this.currentPlayer.bibs++;
            this.currentGame.bibs++;
          
        } else {
          this.undoTurn();
          this.moreDarts = true;
         // this.throwNum = 1;
          this.startNewRound();
        }
      });
    }
    else {
      Swal.fire({
        title: 'Turn Complete',
        text: 'Commit score and move to next player?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Undo Turn',
        confirmButtonText: 'Next Player',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
            this.onNextPlayer();
        } else {
          this.undoTurn();
          this.moreDarts = true;
         // this.throwNum = 1;
          this.startNewRound();
        }
      });
      this.moreDarts = false;
    }
    this.showSingle();
    }
    else{
      if (BiB){
        this.currentRound.bib++;
        this.currentPlayer.bibs++;
        this.currentGame.bibs++;
        
      }
      //TODO:  check if Home Team for redemption
      this.currentGame.isWinner = true;
      this.gameOver(this.currentPlayer.firstName);
    }
  }

 gameOver(name: string){
  Swal.fire(name + ' Wins');
 }

 ngOnDestroy(): void {
}

}

