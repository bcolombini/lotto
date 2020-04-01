import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addZero'
})
export class AddZeroPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(typeof(value) === 'object'){
      return this.addZeroInArray(value)
    }
    return this.addZero(value);
  }

  private addZeroInArray(value){
    let x = []
    for(let i = 0; i < value.length ; i++){
      x.push(this.addZero(value[i]))
    }
    return x.sort();
  }


  private addZero(value:number){
    if(value<10){
      return " 0"+value;
    }
    return " "+value;
  }

}
