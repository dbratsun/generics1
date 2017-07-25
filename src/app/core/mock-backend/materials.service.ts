import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Material } from '../../core/models/material.entity';

@Injectable()
export class MaterialsService {

    private static handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            if (error.status === 404) {
                errMsg = `Resource ${error.url} was not found`;    
            } else {
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        return Observable.throw(errMsg);
    }

    constructor(private http: Http) { }

    list(): Observable<Material[]> {
        return this.http.get('materials')
            .map(response => { 
                let r = response.json() as Material[];
                return r;
            })
            .catch(MaterialsService.handleError);
    }
    
    getMaterial(id: number): Observable<Material> {
        return this.http.get(`materials/${id}`)
            .map(response => response.json() as Material)
            .catch(MaterialsService.handleError); 
    }
}