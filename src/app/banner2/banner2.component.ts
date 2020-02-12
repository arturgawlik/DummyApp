import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-banner2',
  template: `
    <h3 class="welcome"><i>{{welcome}}</i></h3>
    <input (input)="input($event)">
    <div class="from-input">{{fromInput}}</div>
  `,
  styles: []
})
export class Banner2Component implements OnInit {
  welcome: string;
  fromInput: string;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.welcome = this.userService.isLoggedIn ?
      'Welcome, ' + this.userService.user.name : 'Please log in.';
  }

  input(e) {
    this.fromInput = e.target.value;
  }

}
