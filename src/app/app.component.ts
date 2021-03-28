import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SignUpData, SignUpService } from './services/sign-up.service';
import { CustomValidators } from './shared/custom.validators';

enum SubmitStatus {
  NOT_SUBMITTED,
  SUCCEEDED,
  FAILED
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  submitStatusses = SubmitStatus;
  submitStatus: SubmitStatus = SubmitStatus.NOT_SUBMITTED;

  signUpForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['']
  });

  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService){
    this.setPasswordValidators();
  }

  setPasswordValidators(): void{
    const { firstName, lastName, password } = this.signUpForm.controls;
    password.setValidators([
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/[a-z]/),
      Validators.pattern(/[A-Z]/),
      CustomValidators.excludesValue(
        [<FormControl>firstName, <FormControl>lastName],
        false
      )
    ]);
    password.updateValueAndValidity();
  }

  onSubmit(): void {
    const formValues = this.signUpForm.value;
    const { firstName, lastName, email, password } = formValues;
    const signUpData: SignUpData = { firstName, lastName, email, password };

    this.signUpService.signUp(signUpData).subscribe(
      () => this.submitStatus = SubmitStatus.SUCCEEDED,
      () => this.submitStatus = SubmitStatus.FAILED
    );
  }

}
