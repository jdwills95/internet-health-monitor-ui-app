import {AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function isAfterDateValidator(beforeDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value >= beforeDate;
      return forbidden ? {DateIsNotAfter: {value: control.value}} : null;
    };
  }