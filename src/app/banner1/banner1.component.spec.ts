import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Banner1Component } from './banner1.component';

describe('Banner1Component', () => {

  let fixture: ComponentFixture<Banner1Component>;
  let component: Banner1Component; 
  let h1: HTMLElement;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        Banner1Component
      ]
    });

    fixture = TestBed.createComponent(Banner1Component);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement;
  });

  it('no component.title after TestBed.createComponent', () => {
    expect(h1.textContent).toEqual('');
  });

  it('should display original text', () => {
    fixture.detectChanges();
    expect(h1.textContent).toEqual(component.title);
  });



});
