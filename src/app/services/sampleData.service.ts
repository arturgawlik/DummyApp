import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SampleDataService {

    constructor(private httpClient: HttpClient) {
    }

    getData() {
        return this.httpClient.get('https://jsonplaceholder.typicode.com/posts');
    }

}
