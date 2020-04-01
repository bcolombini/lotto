import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private betPrice:number = 0.002;;
  
  constructor() { }

  doCalculate(numbersSelected: Number[]) {
    var gamesTime = 0
    var probability = 0;
    var totalBet = 0;
    
    if(numbersSelected.length >= 6){
      gamesTime = this.combinationGame(numbersSelected.length);
      probability = ((gamesTime/this.combinationGame(60))*100);
      totalBet = (gamesTime * this.betPrice)
    } 
    return {
      "gamesTime":gamesTime,
      "probability":probability,
      "totalBet":totalBet,
    }
  }

  private factorial(num: number) {
    var initialVar = 1;
    for(let i = 1 ; i <= num ; i ++){
      initialVar = initialVar*i;
    }
    return initialVar;
  }

  private combinationGame(gameArray,k = 6):number {
    if(n < k){
      throw new Error("N should be higher then k")
    }
    var n = gameArray
    var nFact = this.factorial(n)
    var kFact = this.factorial(k)
    var n_sub_kFact = this.factorial(n-k)
    return nFact/(kFact*n_sub_kFact)
  }
}
