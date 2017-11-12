import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[dateRange][formControlName],[dateRange][formControl],[dateRange][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateRangeValidatorDirective), multi: true}
  ]
})
export class DateRangeValidatorDirective implements Validator {

  constructor(@Attribute('dateRange') public dateRange: string, @Attribute('reverse') public reverse: string) { }

  private get isReverse() {
    if (!this.reverse) return false;
    return this.reverse === 'true' ? true: false;
  }

  validate(myNode: AbstractControl): { [key: string]: any} {
    let otherNode = myNode.root.get(this.dateRange);
    let startDateNode = otherNode;
    let endDateNode = myNode;
    if (this.isReverse){
      startDateNode = myNode;
      endDateNode = otherNode;
    }


    if(!startDateNode || !endDateNode || !startDateNode.value || !endDateNode.value){
      return null;
    }

    let error = null;
    if (startDateNode.value > endDateNode.value) {
      error = {
        dateRange: false
      }
    }

    if(this.isReverse && error){
      // Set an error on the end node.
      endDateNode.setErrors(error);
      return null;
    }
    else if (!error){
      // Clear any errors on the end node. 
      delete endDateNode.errors['dateRange'];
      if (!Object.keys(endDateNode.errors).length) endDateNode.setErrors(null);
      return null;
    }

    return error;
  }
}
