import { Component, Input, OnInit, Renderer } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CommonEditor } from '../common-editor.abstract';
import { ClarityCommonEditor } from './clarity.common-editor.abstract';

@Component({
    selector: 'app-clarity-string-editor',
    template: `
    <div class="form-group">
      <label [for]="id">{{alias}}</label>
      <input #input type="text" [id]="id" [(ngModel)]="entity[propertyName]">
    </div>`,
})
export class ClarityStringEditorComponent extends ClarityCommonEditor { // implements OnInit{
  constructor(render: Renderer) {
    super(render);
  }
}
