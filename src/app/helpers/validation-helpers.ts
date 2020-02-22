import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable,  timer } from 'rxjs';
import { UserService } from '../services/user.service';
import { map, switchMap } from 'rxjs/operators';
import { IResponse } from '../interfaces/response';


export function validateName(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return timer(1000).pipe(switchMap(() => userService.isNameExists(control.value)),
            map((response) => {
                let r = response as unknown as IResponse;
                console.log(r);
                return r.fields.exists ? { usernameExists: true } : null;
            }));
    }
}