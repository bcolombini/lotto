import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markOnlyNumber'
})
export class MarkOnlyNumberPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    var v = ""
    for(let i = 0 ; i < value.length ; i++){
      if(value[i].isInteger()){
        v = v+"<b>"+value[i]+"</b>"
      }else{
        v = v+value[i]
      }
    }
    return v
  }

}
