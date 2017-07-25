import { Injectable } from '@angular/core';
import { Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UNITS, MATERIALS } from './mock';

@Injectable()
export class MockService {
    constructor(private backend: MockBackend) { }
    
    start(): void {
        this.backend.connections.subscribe((c: MockConnection) => {
            // const URL = "http://localhost:4200/";

            let materialsIdRegex = /\materials\/([0-9]+)/i;
 
 
            if (c.request.url === 'materials' && c.request.method === 0) {
                console.log(JSON.stringify(MATERIALS));
                c.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(MATERIALS)
                })));
            } else if (c.request.url.match(materialsIdRegex) && c.request.method === 0) {
                let matches = MATERIALS.filter((material) => {
                    return material.id === +(c.request.url.match(materialsIdRegex)[1])
                });
                c.mockRespond(new Response( new ResponseOptions({
                    body: JSON.stringify(matches[0])
                })));
            } else if (c.request.url === 'units' && c.request.method === 0) {
                console.log(JSON.stringify(UNITS));
                c.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(UNITS)
                })));
            }
        })
    }
}