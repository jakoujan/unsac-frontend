import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(user: IUser): string {
    return user ? user.name : '';
  }

}
