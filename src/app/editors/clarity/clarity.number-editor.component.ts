import { Component, ElementRef, Input, OnInit, Renderer, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CommonEditor } from '../common-editor.abstract';
import { ClarityCommonEditor } from './clarity.common-editor.abstract';

@Component({
    selector: 'app-clarity-number-editor',
    template: `
    <div class="form-group">
      <label [for]="id">{{alias}}</label>
      <input type="text" [id]="id" [(ngModel)]="entity[propertyName]">
    </div>`,
})
export class ClarityNumberEditorComponent extends ClarityCommonEditor implements OnInit {
  @ViewChild('div.form-group') inputChild: ElementRef;
  @Input() size: string;

  constructor(private el: ElementRef, private render: Renderer) {
    super();
  }

  ngOnInit() {
    const hostElement = this.el.nativeElement;

    // let input = hostElement.querySelector('input');
    let input = this.inputChild;
    if (this.size) {
      this.render.setElementAttribute(input, "size", this.size)
    }
    else {
      this.render.setElementAttribute(input, "size", null)
    }
  }
}
