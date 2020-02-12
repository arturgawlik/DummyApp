import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Banner2Component } from './banner2.component';
import { UserService } from '../user.service';

describe('Banner2Component', () => {
  
  let component: Banner2Component;
  let fixture: ComponentFixture<Banner2Component>;
  let userService: Partial<UserService>;
  let welcomeEl: HTMLElement;
  let inputEl: HTMLInputElement;
  let fromInputElem: HTMLElement;

  beforeEach(() => {
    let userServiceMock = {
      isLoggedIn: true,
      user: {
        name: 'Test User'
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        Banner2Component
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock }
      ]
    });

    fixture = TestBed.createComponent(Banner2Component);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    welcomeEl = fixture.nativeElement.querySelector('.welcome');
    inputEl = fixture.nativeElement.querySelector('input');
    fromInputElem = fixture.nativeElement.querySelector('.from-input');
  });

  it('should welcome user', () => {
    fixture.detectChanges();
    expect(welcomeEl.textContent).toContain('Welcome', 'Contain welcome');
    expect(welcomeEl.textContent).toContain(userService.user.name, 'not contain username from service');
  });

  it('should update userName', () => {
    userService.user.name = 'Bob';
    fixture.detectChanges();
    expect(welcomeEl.textContent).toContain('Bob', 'not update username from service');
  });

  it('should react on input', () => {
    inputEl.value = 'hello from dark side';
    inputEl.dispatchEvent(new Event('input'));
    expect(component.fromInput).toEqual('hello from dark side');
    fixture.detectChanges();
    expect(fromInputElem.textContent).toEqual('hello from dark side');
  });

});
