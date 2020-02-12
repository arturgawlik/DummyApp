import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner1',
  template: `
    <h1>{{title}}</h1>
  `,
  styles: ['h1 { color: green; font-size: 350%}']
})
export class Banner1Component implements OnInit {

  title = 'Test tour of heroes';

  constructor() { }

  ngOnInit() {
  }

}
