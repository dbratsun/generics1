import {Component, Input} from '@angular/core';
import {Observable}       from "rxjs/Rx";
import {CommonEditor} from './common';

@Component({
    selector: 'string-editor',
    template: `
    <dl>
      <dt>{{propertyName}}</dt>
      <dd>
        <input
          type="text"  
          [(ngModel)]="entity[propertyName]"  />
      </dd>
    </dl>`,
})
export class StringEditor { // implements CommonEditor{
    @Input() public propertyName: string;
    @Input() public entity: any;
};