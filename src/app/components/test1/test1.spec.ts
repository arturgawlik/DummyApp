import { Test1Component } from "./test1.component";
import { TestBed } from '@angular/core/testing';
import { SampleDataService } from 'src/app/services/sampleData.service';
import { defer, of } from 'rxjs';

describe('Test1Component', () => {
    
    const sampleDataServiceStub = {
        getData() {
          const todos = [{id: 1}];
          return of( todos );
        }
      };

    let comp: Test1Component;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                Test1Component,
                { provide: SampleDataService, useValue: sampleDataServiceStub }
            ]
        });
        comp = TestBed.get(Test1Component);
    });

    it('sampleData should be null', () => {
        expect(comp.sampleData).toBeNull();
    });

    it('sampleData should have data', () => {
        comp.ngOnInit();
        expect(comp.sampleData).not.toBeNull();
    });

    // it('click dont throw exception', () => {
    //     const comp = new Test1Component();
    //     expect().nothing();
    // });

    // it('click should increase counter', () => {
    //     const comp = new Test1Component();
    //     expect(comp.counter).toBe(0, '0 at first');
    //     comp.click();
    //     expect(comp.counter).toBe(1, '1 after first click');
    //     comp.click();
    //     expect(comp.counter).toBe(2, '2 after second click');
    // });

    // it('raises the click event when clicked', (done: DoneFn) => {
    //     const comp = new Test1Component();
    //     comp.clicked.subscribe(
    //         val => {
    //             expect(val).toBe(1, 'expect to be one after one click');
    //             done();
    //         },
    //         err => {
    //             fail('should not throw error');
    //             done();
    //         }
    //     );
    //     comp.click();
    // });

    function asyncData<T>(data: T) {
        return defer(() => Promise.resolve(data));
    }

    function asyncError<T>(errorObject: any) {
        return defer(() => Promise.reject(errorObject));
    }

});
