import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Banner3Component } from './banner3.component';
import { of } from 'rxjs';
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
        { provide: TwainService, useValue: getQuoteSpy }
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

});
