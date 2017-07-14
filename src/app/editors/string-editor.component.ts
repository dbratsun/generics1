import {Component, Input, Renderer} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {CommonEditor} from './common-editor.abstract';

@Component({
    selector: 'app-string-editor',
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
export class StringEditorComponent extends CommonEditor {
  constructor(render: Renderer) {
    super(render);
  }
}
