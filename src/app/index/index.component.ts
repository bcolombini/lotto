import { Component, OnInit, ViewChild } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { viewClassName } from '@angular/compiler';
import { LastgameComponent } from '../lastgame/lastgame.component';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  
  @ViewChild('cart',{static:true}) cartComponent:CartComponent;
  
  public numbers:Number[];
  public numbersSelected:Number[] = [];

  constructor() { 
    this.numbers = Array(60).fill(0).map((x,i)=>i+1);
  }

  ngOnInit() {
  }

  onSelected($event){
    var elementId = parseInt($event.target.id)
    if(!this.numbersSelected.includes(elementId) && this.numbersSelected.length < 30){
      this.numbersSelected.push(elementId)
    } else {
      this.numbersSelected = this.numbersSelected.filter(v=>v != elementId)
    } 
    this.cartComponent.updateComponent(this.numbersSelected)
  }

  isSelected(item){
    return this.numbersSelected.includes(item)
  }
}
