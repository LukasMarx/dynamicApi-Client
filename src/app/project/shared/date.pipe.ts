import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (typeof value === 'string') {
      try {
        const date = new Date(value);
        let options = {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        };
        return date.toLocaleString('en-us', options);
      } catch (error) {
        console.log('Date Pipe: Could not convert String to Date');
        return value;
      }
    }
  }
}
