import { Component, OnInit, OnChanges } from '@angular/core';
import { EthcontractService } from '../contract/ethcontract.service';
import { Observable, Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-lastgame',
  templateUrl: './lastgame.component.html',
  styleUrls: ['./lastgame.component.scss']
})
export class LastgameComponent implements OnInit, OnChanges {

  private contractAddress:string = "0xa8dA65abD90801E03f31f05003b5426dE057D184";
  pastLogs = []

  constructor(private ethcontractService: EthcontractService) { 
    this.ethcontractService.getWeb3Ws().eth.subscribe("logs",{
      address:this.contractAddress
    }).on('data',(data)=>{
      if(this.pastLogs.length > 10){
        this.pastLogs.pop();
      }
      this.pastLogs.unshift(this.ethcontractService.formatData(data));
    }).on('changed',(changed)=>{
      console.log(changed)
    })
  }

  ngOnChanges(){
  }

  async ngOnInit() {
    this.pastLogs = await (await this.ethcontractService.getPastLogs(this.contractAddress)).filter((v,i)=>i<10)    
  }
}
