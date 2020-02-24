import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Banner3Component } from './banner3.component';
import { of, throwError, defer } from 'rxjs';
import { TwainService } from '../services/twain.service';

describe('Banner3Component', () => {

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

  it('should quote after component initialized', () => {
    fixture.detectChanges();

    expect(quoteEl.textContent).toBe(testQuote);
    expect(getQuoteSpy.calls.any()).toBe(true, 'getQuote called');
  });

  it('should display error when TwainService fails', fakeAsync(() => {
    getQuoteSpy.and.returnValue(throwError('TwainService test failure'));

    fixture.detectChanges();

    tick();

    fixture.detectChanges();

    expect(component.errorMessage).toMatch(/test failure/, 'should display error');
    expect(quoteEl.textContent).toBe('...', 'should how placeholder');
  }));

  it('should show quote after component init (fakeAsync)', fakeAsync(() => {
    getQuoteSpy.and.returnValue(asyncData(testQuote));
    expect(quoteEl.textContent).toBeFalsy();
    fixture.detectChanges();
    expect(quoteEl.textContent).toBe('...');
    tick();
    fixture.detectChanges();
    expect(quoteEl.textContent).toBe(testQuote);
  }));

  it('should show quote afres component init (async)', async(() => {
    getQuoteSpy.and.returnValue(asyncData(testQuote));
    fixture.detectChanges();
    expect(quoteEl.textContent).toBe('...');
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(quoteEl.textContent).toBe(testQuote);
    });
  }));

});





/** Create async observable that emits-once and completes
 *  after a JS engine turn */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}


/** Create async observable error that errors
 *  after a JS engine turn */
export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
