import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'fas fa-check' : 'fas fa-times';
  }

}
