import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {CommonEditor} from './common';

@Component({
    selector: 'app-text-editor',
    template: `
    <dl>
      <dt>{{propertyName}}</dt>
      <dd>
        <textarea cols=15 rows=5
          [(ngModel)]="entity[propertyName]"
          ></textarea>
      </dd>
    </dl>`,
})
export class TextEditor extends CommonEditor {
    // @Input() public propertyName: string;
    // @Input() public entity: any;
};
