import {Component, Input} from '@angular/core';
import {Observable}       from "rxjs/Rx";

@Component({
    selector: 'number-editor',
    template: `
    <dl>
      <dt>{{propertyName}}</dt>
      <dd>
        <input
          type="number"  
          [(ngModel)]="entity[propertyName]"  />
      </dd>
    </dl>`,
})
export class NumberEditor { 
    @Input() public propertyName: string;
    @Input() public entity: any;
};
