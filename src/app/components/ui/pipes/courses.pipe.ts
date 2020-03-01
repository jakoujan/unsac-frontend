import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'courses'
})
export class CoursesPipe implements PipeTransform {

  transform(value: Array<any>, input: string): any {
    const f = input.toLowerCase();
    return f ? value.filter(item => item.title.toLowerCase().indexOf(input) >= 0) : value;
  }

}
