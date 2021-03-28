import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SignUpService } from './sign-up.service';

describe('SignUpService', () => {
  let signUpService: SignUpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    signUpService = TestBed.inject(SignUpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(signUpService).toBeTruthy();
  });

  it('should should have made a succesfull request', () => {
    signUpService.signUp({
      firstName: 'John',
      lastName: 'Doe',
      email: 'JohnDoe@example.com'
    }).subscribe((response) => {
      expect(response).toBeNull();
    });

    const requestExpector = httpTestingController.expectOne({method: 'POST'});
    requestExpector.flush(null);

    expect(requestExpector.request.method).toEqual('POST');
  });

  it('should should have made a failed request', () => {
    signUpService.signUp({
      firstName: 'John',
      lastName: 'Doe',
      email: 'JohnDoe@example.com'
    }).subscribe(() => {}, (error) => {
      expect(error).toBeTruthy();
    });

    const requestExpector = httpTestingController.expectOne({method: 'POST'});
    requestExpector.error(new ErrorEvent('Internal server error'));

    expect(requestExpector.request.method).toEqual('POST');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
