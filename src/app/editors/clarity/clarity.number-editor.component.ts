import { Component, ElementRef, Input, OnInit, Renderer, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CommonEditor } from '../common-editor.abstract';
import { ClarityCommonEditor } from './clarity.common-editor.abstract';

@Component({
    selector: 'app-clarity-number-editor',
    template: `
    <div class="form-group">
      <label [for]="id">{{alias}}</label>
      <input #input type="number" [id]="id" [(ngModel)]="entity[propertyName]">
    </div>`,
})
export class ClarityNumberEditorComponent extends ClarityCommonEditor { // implements OnInit {

  constructor(render: Renderer) {
    super(render);
  }

}
