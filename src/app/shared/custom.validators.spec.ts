import { FormControl } from '@angular/forms';
import { CustomValidators } from './custom.validators';

describe('excludesValue', () => {
  const myControl1 = new FormControl();
  myControl1.setValue('input1');
  const myControl2 = new FormControl();
  myControl2.setValue('input2');

  it('Should give error when control includes (case sensitive) value of other control', () => {
    const excludesValueValidator = CustomValidators.excludesValue(myControl1, true);
    const control = new FormControl();
    control.setValue('----InPut1---');
    expect(excludesValueValidator(control)).toBeNull();
    control.setValue('----input1---');
    expect(excludesValueValidator(control)).toEqual({ valueOverlap: true });

    control.setValue('Some other input that does not contain value of control1');
    expect(excludesValueValidator(control)).toBeNull();
  });

  it('Should give error when control includes (case insensitive) value of other controls', () => {
    const excludesValueValidator = CustomValidators.excludesValue([myControl1, myControl2], false);
    const control = new FormControl();
    control.setValue('----input2---');
    expect(excludesValueValidator(control)).toEqual({ valueOverlap: true });
    control.setValue('----InPut1---');
    expect(excludesValueValidator(control)).toEqual({ valueOverlap: true });

    control.setValue('Some other input that does not contain value of control1 or control2');
    expect(excludesValueValidator(control)).toBeNull();
  });

});
