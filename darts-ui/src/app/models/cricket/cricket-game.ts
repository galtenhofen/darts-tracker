import {CricketRound} from './cricket-round';
import {CricketPlayer} from './cricket-player';

export class CricketGame {
  gameId: number;
  player: CricketPlayer;
  rounds: CricketRound[];
  bibs: number;
  twentyHits: number;
  nineteenHits: number;
  eighteenHits: number;
  seventeenHits: number;
  sixteenHits: number;
  fifteenHits: number;
  bullseyeHits: number;
  isActive: boolean;
  isWinner: boolean;
 
  [key: string]: number | boolean | CricketPlayer | CricketRound[] | undefined | ((prefix: string) => { hits: number; closed: boolean });

  constructor(player: CricketPlayer) {
    this.gameId = 0;
    this.player = player;
    this.rounds = [];
    this.twentyHits = 0;
    this.nineteenHits = 0;
    this.eighteenHits = 0;
    this.seventeenHits = 0;
    this.sixteenHits = 0;
    this.fifteenHits = 0;
    this.bullseyeHits = 0;
    this.bibs = 0;
    this.isActive = false;
    this.isWinner = false;
  }

  get twentyClosed(): boolean {
    return this.twentyHits > 2;
  }

  get nineteenClosed(): boolean {
    return this.nineteenHits > 2;
  }

  get eighteenClosed(): boolean {
    return this.eighteenHits > 2;
  }

  get seventeenClosed(): boolean {
    return this.seventeenHits > 2;
  }
  

  get sixteenClosed(): boolean {
    return this.sixteenHits > 2;
  }

  get fifteenClosed(): boolean {
    return this.fifteenHits > 2;
  }


  get bullseyeClosed(): boolean {
    return this.bullseyeHits > 2;
  }

  
  getPropertyValue(prefix: string): { hits: number; closed: boolean } {
    const hits = this[prefix + 'Hits'] as number;
    const closed = this[prefix + 'Closed'] as boolean;
    return { hits, closed };
  }

  get currentTarget(): number {
    if (!this.twentyClosed) {
      return 20;
    } else if (!this.nineteenClosed) {
      return 19;
    } else if (!this.eighteenClosed) {
      return 18;
    } else if (!this.seventeenClosed) {
      return 17;
    } else if (!this.sixteenClosed) {
      return 16;
    } else if (!this.fifteenClosed) {
      return 15;
    } else if (!this.bullseyeClosed) {
      return 25;
    } else {
      // If all targets are closed, return an empty string or handle the case accordingly
      return 0;
    }
  }
}

