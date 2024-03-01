import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CricketGame } from 'src/app/models/cricket/cricket-game';
import { CricketPlayer } from 'src/app/models/cricket/cricket-player';
import { CricketRound } from 'src/app/models/cricket/cricket-round';

@Component({
  selector: 'app-cricket-stats',
  templateUrl: './cricket-stats.component.html',
  styleUrls: ['./cricket-stats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CricketStatsComponent implements OnInit {

  @Input() firstPlayerGame!: CricketGame;
  @Input() secondPlayerGame!: CricketGame;
  @Input() currentRound!: CricketRound;
  @Input() currentPlayer!: CricketPlayer;
  @Input() currentGame!: CricketGame;

currentPlayerBibs: number = 0;
currentPlayerHitRate: number = 0.0;
currentPlayerTotalRate: number = 0.0;
currentPlayerLastTurn: number = 0;

  constructor() { }

  ngOnInit(): void {
  }



  getMostRecentTotal(): number {
    if (this.currentGame && this.currentGame.rounds.length > 0) {
      const mostRecentRound: CricketRound = this.currentGame.rounds[this.currentGame.rounds.length - 1];
      const overage = this.getExcessHitsForPrevTarget();
      console.log('overage', overage);
      // Calculate the sum of multipliers for darts with target not equal to 0
      const multiplierSum = mostRecentRound.darts
        .filter(dart => dart.target !== 0) // Filter out darts with target 0
        .reduce((sum, dart) => sum + dart.multiplier, 0); // Sum the multipliers of remaining darts
        if (multiplierSum > 3){
      return multiplierSum - overage;
        }
    }
    return 0; // Return 0 if there are no rounds or no darts in the most recent round
  }

  getAverageMultiplierPerRound(): number {
    if (this.currentGame && this.currentGame.rounds.length > 0) {
      let totalMultipliers = 0;
      let totalRounds = this.currentGame.rounds.length;
      
      // Iterate over each round
      this.currentGame.rounds.forEach(round => {
        // Iterate over darts in each round
        round.darts.forEach(dart => {
          // Add the multiplier to totalMultipliers if the target is not 0
          if (dart.target !== 0) {
            totalMultipliers += dart.multiplier;
          }
        });
      });
      const overage = this.getSumOfOverages();
      // Calculate the average multiplier per round
      const averageMultiplier = (totalMultipliers-overage) / totalRounds;
      return averageMultiplier;
    }
    return 0; // Return 0 if there are no rounds
  }

  getSumOfOverages(): number {
    if (this.currentGame) {
      let sumAboveThree = 0;
  
      // Check if twentyHits, nineteenHits, etc., are greater than 3, and accumulate the sum
      if (this.currentGame.twentyHits > 3) {
        sumAboveThree += this.currentGame.twentyHits - 3;
      }
      if (this.currentGame.nineteenHits > 3) {
        sumAboveThree += this.currentGame.nineteenHits - 3;
      }
      if (this.currentGame.eighteenHits > 3) {
        sumAboveThree += this.currentGame.eighteenHits - 3;
      }
      if (this.currentGame.seventeenHits > 3) {
        sumAboveThree += this.currentGame.seventeenHits - 3;
      }
      if (this.currentGame.sixteenHits > 3) {
        sumAboveThree += this.currentGame.sixteenHits - 3;
      }
      if (this.currentGame.fifteenHits > 3) {
        sumAboveThree += this.currentGame.fifteenHits - 3;
      }
      if (this.currentGame.bullseyeHits > 3) {
        sumAboveThree += this.currentGame.bullseyeHits - 3;
      }
  
      return sumAboveThree;
    }
    return 0; // Return 0 if currentGame is undefined or null
  }

  getExcessHitsForPrevTarget(): number {
    if (this.currentGame && this.currentGame.rounds.length > 0) {
      const mostRecentRound = this.currentGame.rounds[this.currentGame.rounds.length - 1];
      const dartsInMostRecentRound = mostRecentRound.darts;
  
      // Find the current target from the most recent round
      const currentTarget = this.currentGame.currentTarget; 
      console.log('nextTarget',currentTarget);
      // Calculate the next target
      const nextTarget = currentTarget + 1;
      console.log('nextTarget',nextTarget);
      // Get the hits for the next target
      let hitsForNextTarget = 0;
      switch (nextTarget) {
        case 20:
          hitsForNextTarget = this.currentGame.twentyHits;
          break;
        case 19:
          hitsForNextTarget = this.currentGame.nineteenHits;
          break;
        case 18:
          hitsForNextTarget = this.currentGame.eighteenHits;
          break;
        case 17:
          hitsForNextTarget = this.currentGame.seventeenHits;
          break;
        case 16:
          hitsForNextTarget = this.currentGame.sixteenHits;
          break;
        case 15:
          hitsForNextTarget = this.currentGame.fifteenHits;
          break;
        case 25:
          hitsForNextTarget = this.currentGame.bullseyeHits;
          break;
      }
  
      // If hits for the next target are greater than 3, return the excess hits
      if (hitsForNextTarget > 3) {
        return hitsForNextTarget - 3;
      }
    }
    return 0; // Return 0 if there are no rounds or hits for the next target are not greater than 3
  }
  


  getAverageHitsPerRound(): number {
    if (this.currentGame && this.currentGame.rounds.length > 0) {
      let totalHits = 0;
      let totalRounds = this.currentGame.rounds.length;
      
      // Iterate over each round
      this.currentGame.rounds.forEach(round => {
        // Iterate over darts in each round
        round.darts.forEach(dart => {
          // Increment the totalHits if the target is not 0
          if (dart.target !== 0) {
            totalHits++;
          }
        });
      });
  
      // Calculate the average hits per round
      const averageHitsPerRound = totalHits / totalRounds;
      return averageHitsPerRound;
    }
    return 0; // Return 0 if there are no rounds
  }

}
