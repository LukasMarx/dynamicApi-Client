import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortener'
})
export class ShortenerPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(typeof value === 'string' && value.length > (args || 97)){
      return value.substring(0,args | 97) + '...'
    }else{
      return value;
    }
  }

}