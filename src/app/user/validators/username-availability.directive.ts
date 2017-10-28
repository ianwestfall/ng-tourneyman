import { Directive, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from "rxjs";
import { UserDataService } from '../user-data.service';

@Directive({
  selector: '[validateUsernameAvailability][formControlName], [validateUsernameAvailability][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UsernameAvailabilityDirective),
      multi: true,
    }
  ]
})
export class UsernameAvailabilityDirective implements Validator {

  constructor(private userDataService: UserDataService,) { }

  validate(c: AbstractControl): Promise<ValidationErrors|null>|Observable<ValidationErrors|null> {
    return this.userDataService.isUsernameAvailable(c.value)
    .toPromise()
    .then(available => {
      if (!available){
        return {asyncInvalid: true};
      }
      
      return null;
    });
  }

}
