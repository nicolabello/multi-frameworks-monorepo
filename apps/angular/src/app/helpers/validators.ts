import { AbstractControl, ValidationErrors, ValidatorFn, Validators as AngularValidators } from '@angular/forms';

export class Validators extends AngularValidators {

  public static inArray(values: any[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (values?.includes(control.value)) {
        return null;
      } else {
        return {
          inArray: true
        };
      }
    };
  }

}
