import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { EthcontractService } from '../contract/ethcontract.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private ethCountract = new EthcontractService()

  constructor() { }

  ngOnInit() {
  }

  async doLogin(){
    await this.ethCountract.getAuthorization()
  }

}
