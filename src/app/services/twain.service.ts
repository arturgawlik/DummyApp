import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwainService {

  constructor() { }

  getQuote() {
    return of('Test quote');
  }
}
