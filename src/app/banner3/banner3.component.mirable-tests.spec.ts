import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Banner3Component } from './banner3.component';
import { of, throwError, defer } from 'rxjs';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { TwainService } from '../services/twain.service';

describe('Banner3Component mirable tests', () => {

  let testQuote;
  let getQuoteSpy;
  let fixture: ComponentFixture<Banner3Component>;
  let component: Banner3Component;
  let quoteEl: HTMLElement;

  beforeEach(() => {
    testQuote = 'Test quote';

    const twainService = jasmine.createSpyObj('TwainService', ['getQuote']);
    getQuoteSpy = twainService.getQuote.and.returnValue(of(testQuote));

    TestBed.configureTestingModule({
      declarations: [
        Banner3Component
      ],
      providers: [
        { provide: TwainService, useValue: twainService }
      ]
    });

    fixture = TestBed.createComponent(Banner3Component);
    component = fixture.componentInstance;
    quoteEl = fixture.nativeElement.querySelector('.twain');
  });

  it('should show quote afrer get quote', () => {
    const q$ = cold('---x|', { x: testQuote });
    getQuoteSpy.and.returnValue(q$);
    fixture.detectChanges();
    expect(quoteEl.textContent).toBe('...', 'should show placeholder');
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(quoteEl.textContent).toBe(testQuote)
  });

  it('should display error message when TwainService fail', fakeAsync(() => {
    const q$ = cold('---#|', null, new Error('TwainService failure'));
    getQuoteSpy.and.returnValue(q$);
    fixture.detectChanges();
    expect(quoteEl.textContent).toBe('...', 'should show placeholder');
    getTestScheduler().flush();
    expect(component.errorMessage).toBeFalsy();
    tick();
    expect(component.errorMessage).toBeTruthy();
  }));

});
