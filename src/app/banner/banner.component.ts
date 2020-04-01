import { Component, OnInit } from '@angular/core';
import { EthcontractService } from '../contract/ethcontract.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor(private ethContract:EthcontractService) { }

  async ngOnInit() {
    let pots = await this.ethContract.getPots()
    console.log(pots.sidePot)
  }

}
