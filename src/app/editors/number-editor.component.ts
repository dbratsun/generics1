import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CommonEditor } from './common-editor.abstract';

@Component({
    selector: 'app-number-editor',
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
export class NumberEditorComponent extends CommonEditor {
}

