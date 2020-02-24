import { Component, OnInit } from '@angular/core';
import { TwainService } from '../services/twain.service';
import { Observable, of } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-banner3',
  template: `
  <p class="twain"><i>{{ quote | async}}</i></p>
  <button (click)="getQuote()">Next quote</button>
  <p class="error" *ngIf="errorMessage">{{ errorMessage }}</p>`,
  styles: []
})
export class Banner3Component implements OnInit {

  quote: Observable<string>;
  errorMessage: string;

  constructor(private twainService: TwainService) {
  }

  ngOnInit(): void {
    this.getQuote();
  }

  getQuote() {
    this.quote = this.twainService.getQuote().pipe(
      startWith('...'),
      catchError((err: any) => {
        // Wait a turn because errorMessage already set once this turn
        setTimeout(() => this.errorMessage = err.message || err.toString());
        return of('...'); // reset message to placeholder
      })
    );
  }

}
