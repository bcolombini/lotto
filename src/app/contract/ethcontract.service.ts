import { Injectable, enableProdMode } from '@angular/core';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import { runInThisContext } from 'vm';
import { reverse } from 'dns';

declare let require: any;
declare let window: any;
let tokenAbi = require('../../assets/Lotto.json');

@Injectable({
  providedIn: 'root'
})

export class EthcontractService {
  
  private web3Provider;
  private web3 = window.web3;
  private web3ws: Web3;

  constructor() {
    if (typeof this.web3 !== 'undefined') {
        this.web3Provider = window.ethereum;
      } else {
        this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      this.web3 = new Web3(this.web3Provider);
      this.web3ws = new Web3(this.web3Provider);    
   }
  
   isLogged(){
     window.ethereum.isLogged()
   }
  async getAuthorization(){
    try {
      await window.ethereum.enable()
    } catch (error) {
      return error.message
    }
  }

  getAccountInfo() {
    return new Promise((resolve, reject) => {
      this.web3.eth.getCoinbase(function(err, account) {
        if(err === null) {
          this.web3.eth.getBalance(account, function(err, balance) {
            if(err === null) {
              return resolve({fromAccount: account, balance:this.web3.fromWei(balance, 'ether')});
            } else {
              return reject('error!');
            }
          });
        }
      });
    });
  }
  async getLastEvents(){
    let lottoContract = TruffleContract(tokenAbi);
    lottoContract.setProvider(this.web3Provider);
    let instance = await lottoContract.deployed();

    let a = await instance.getPastEvents({fromBlock:7000},(err,res)=>console.log)
    console.log(a)
  }
  async getPastLogs(address:string){
    let data = await this.web3.eth.getPastLogs({address:address,fromBlock:7000});
    data = data.reverse()
    let allEvents = []
    for(let i = 0 ; i < data.length ; i++){
      allEvents.push(this.convertLog(this.spliDataString(data[i])))
    }
    return allEvents;
  }

  getWeb3Ws(){return this.web3ws}
    
  async doBet(game:Number[],price){
    event.preventDefault();
    let accounts = await this.web3.eth.getAccounts();
    if(accounts.length == 0){
      this.getAuthorization()
      return
    }
    let lottoContract = TruffleContract(tokenAbi);
    lottoContract.setProvider(this.web3Provider);
    try{
    let instance = await lottoContract.deployed();
    instance.buyTicket(game,{from:accounts[0],value:this.web3.utils.toWei(price),gasPrice:20000}).then(a=>console.log(a))
    } catch(error){
      console.log(error)
    }
  }
  
  formatData(data){
    return this.convertLog(this.spliDataString(data))
  }

  private spliDataString(data){
    let x = []
    let y = ""
    let res = data.data.replace("0x","");
    for(let i = 0 ; i < res.length ; i ++){
      if(y.length == 64){
        x.push(y)
        y = ""
      }
      y = y+res[i];
    }
    x.push(y)
    return x;
  }

  private convertLog(array){
    let sortNumber:number[] = []
    let isVictory:boolean = false;
    let title:string = "" 
    let gamePlayed:number[] = []
    let address = array[8]
    for(let i = 1 ; i < 7 ; i++){
      sortNumber.push(parseInt(array[i],16))
    }

    isVictory = Boolean(parseInt(array[8],16));
    title = this.web3.utils.hexToUtf8("0x"+array[11]);
    let sizeGamePlayed = parseInt(array[12],16);
    for(let i = 1 ; i <= sizeGamePlayed;i++){
      gamePlayed.push(parseInt(array[12+i],16));
    }
    return{
      "address":"0x"+address.substring(24),
      "sortNumber":sortNumber,
      "isVictory":isVictory,
      "title":title,
      "gamePlayed":gamePlayed
    }
  }

  async getPots(){
    let lottoContract = TruffleContract(tokenAbi);
    lottoContract.setProvider(this.web3Provider);
    let instance = await lottoContract.deployed();
    let mainPot = await instance.getMainPot();
    let sidePot = await instance.getSidePot();
    
    return{
      "mainPot":mainPot,
      "sidePot":sidePot
    }
  }
}
