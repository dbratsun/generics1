import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CommonEditor } from '../common-editor.abstract';
import { ClarityCommonEditor } from './clarity.common-editor.abstract';

@Component({
    selector: 'app-clarity-string-editor',
    template: `
    <div class="form-group">
      <label [for]="id">{{alias}}</label>
      <input type="text" [id]="id" [(ngModel)]="entity[propertyName]">
    </div>`,
})
export class ClarityStringEditorComponent extends ClarityCommonEditor implements OnInit{
  @Input() size: string;
  public sizeText: string = '';
  ngOnInit() {
    if (this.size) {
      this.sizeText = 'size="30"'
    }
    else {
      this.sizeText = '';
    }
  }
}
