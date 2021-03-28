import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  /**
   * @description Checks if the AbstractControl contains any of the values already inputted in other FormControl(s)
   * @param testSubject Either a single FormControl or Array of FormControls to match against
   */
  public static excludesValue(testSubject: FormControl | FormControl[], isCaseSensitive = true): ValidatorFn {
    return (formControl: AbstractControl): ValidationErrors | null => {
      const formControls = Array.isArray(testSubject) ? testSubject : [testSubject];
      const invalidValues = formControls.map(c => c.value).filter(v => v.length);

      const isInvalid = invalidValues.some(value => {
        const invalidOverlapValue = isCaseSensitive ? value : value.toLowerCase();
        const formControlValue = isCaseSensitive ? formControl.value : formControl.value.toLowerCase();

        return formControlValue.includes(invalidOverlapValue);
      });

      return isInvalid
      ? { valueOverlap: true }
      : null;
    };
  }

}

