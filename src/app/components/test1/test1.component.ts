import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { SampleDataService } from 'src/app/services/sampleData.service';

@Component({
    selector: 'app-test1',
    template: `
        <p>hello</p>
        <button (click)="click()">click me!</button>
        <p>count: {{counter}}</p>
        <p>Sample data:</p>
        <br>
        {{sampleData | json}}

    `
})
export class Test1Component implements OnInit {
    
    ngOnInit(): void {
        this.sampleDataService.getData().subscribe(val => this.sampleData = val);
    }
    
    @Output() clicked = new EventEmitter<number>();

    sampleData = null;
    counter = 0;

    constructor(private sampleDataService: SampleDataService) {
    }

    click() {
        this.counter++;
        this.clicked.next(this.counter);
    }

}
