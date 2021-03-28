import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { SignUpData, SignUpService } from './services/sign-up.service';


export class SignUpServiceMock {
  signUp = (signUpData: SignUpData) => of(HttpResponse);
}

describe('AppComponent', () => {
  let signUpService: SignUpService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: SignUpService, useClass: SignUpServiceMock }
      ]
    }).compileComponents();

    signUpService = TestBed.inject(SignUpService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should contain form with invalid fields`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.signUpForm).toBeTruthy();
    expect(app.signUpForm.valid).toBeFalse();
  });

  it(`should contain basic form validation`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const { firstName, lastName, email } = app.signUpForm.controls;

    expect(firstName.hasError('required')).toBeTrue();
    firstName.setValue('John');
    expect(firstName.valid).toBeTrue();

    expect(lastName.hasError('required')).toBeTrue();
    lastName.setValue('Doe');
    expect(lastName.valid).toBeTrue();

    expect(email.hasError('required')).toBeTrue();
    email.setValue('notavalidemailadress.com');
    expect(email.hasError('required')).toBeFalse();
    expect(email.hasError('email')).toBeTrue();
    email.setValue('avalid@emailadress.com');
    expect(email.valid).toBeTrue();
  });

  it(`should have basic password validation`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const { password } = app.signUpForm.controls;

    password.updateValueAndValidity();

    expect(password.hasError('required')).toBeTrue();
    password.setValue('Secret');
    expect(password.hasError('required')).toBeFalse();
    expect(password.hasError('pattern')).toBeFalse();
    expect(password.hasError('minlength')).toBeTrue();
    password.setValue('MyLongPassword');
    expect(password.valid).toBeTrue();
  });

  it(`should check if password does not contain first or last name`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const { firstName, lastName, password } = app.signUpForm.controls;

    password.updateValueAndValidity();

    firstName.setValue('John');
    lastName.setValue('Doe');

    expect(password.hasError('valueOverlap')).toBeFalse();
    password.setValue('JohnDoe123');
    expect(password.hasError('valueOverlap')).toBeTrue();
    password.setValue('MyUniquePassword');
    expect(password.valid).toBeTrue();
  });

  it('should call service to post data to endpoint', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const { firstName, lastName, email, password } = app.signUpForm.controls;

    firstName.setValue('John');
    lastName.setValue('Doe');
    email.setValue('example@example.com');
    password.setValue('MySecretPassword');

    const signUpSpy = spyOn(signUpService, 'signUp').and.callThrough();

    app.onSubmit();
    expect(signUpSpy).toHaveBeenCalledWith({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value
    });
  });
});
