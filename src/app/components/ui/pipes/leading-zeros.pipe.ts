import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leadingZeros'
})
export class LeadingZerosPipe implements PipeTransform {

  transform(value: number, quantity: number): string {
    let s = value + "";
    while (s.length < quantity) s = "0" + s;
    return s;
  }

}
