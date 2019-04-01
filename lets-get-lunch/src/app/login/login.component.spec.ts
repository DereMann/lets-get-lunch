import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterStub } from '../testing/router-stubs';
import { AuthService } from '../services/auth/auth.service';
import { LoginModule } from './login.module';

import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

class LoginPage {
  loginBtn: DebugElement;
  usernameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;

  addPageElements() {
    this.loginBtn = fixture.debugElement.query(By.css('button'));
    this.usernameInput = fixture
                            .debugElement
                            .query(By.css('[name=username]'))
                            .nativeElement;
    this.passwordInput = fixture
                            .debugElement
                            .query(By.css('[name=password'))
                            .nativeElement;
  }
}

class MockAuthService {
  login (credentials) {}
}

let component: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;
let authService: AuthService;
let router: Router;
let loginPage: LoginPage;

describe('LoginComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ LoginModule ]
    })
    .overrideComponent(LoginComponent, {
      set: {
        providers: [
          { provide: AuthService, useClass: MockAuthService },
          { provide: Router, useClass: RouterStub}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    loginPage = new LoginPage();
    authService = fixture.debugElement.injector.get(AuthService);
    router = fixture.debugElement.injector.get(Router);

    return fixture.whenStable().then(() => {
      fixture.detectChanges();
      loginPage.addPageElements();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
