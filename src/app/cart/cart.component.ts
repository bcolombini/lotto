import { Component, OnInit} from '@angular/core';
import { CartService } from './cart.service';
import { IfStmt } from '@angular/compiler';
import { EthcontractService } from '../contract/ethcontract.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  gamesTime:string = "0";
  probability:string = "0 %";
  totalBet:string = "0.00000000";
  private game:Number[] = [];
  private disableButton:boolean = false;

  constructor(private cartService:CartService,
    private ethContractService: EthcontractService) {}

  ngOnInit(){
  }

  updateComponent(gameArray:Number[]){
    this.game = gameArray;
    this.disableButton = gameArray.length >= 6;
    var cartObject = this.cartService.doCalculate(gameArray)
    this.gamesTime = cartObject.gamesTime.toFixed(0);
    this.probability = cartObject.probability.toFixed(6)+" %";
    this.totalBet = cartObject.totalBet.toFixed(8);
  }

  disableSubmit() {
    return !this.disableButton
  }

  doBet(){
    this.ethContractService.doBet(this.game,this.totalBet);
  }

 

 

}
