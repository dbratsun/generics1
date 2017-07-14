import { Component, Input, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { BaseComponent, OnSetAttributes } from './base.component.abstract';

@Component({
    selector: 'app-label',
    template: `<label #label>{{text}}</label>`
})

export class LabelComponent extends BaseComponent {
    @Input() text: string;
    @Input() id: string;
    @ViewChild('label') label: ElementRef

    setAttribute(): boolean {
        this.setElementAttribute(this.label, 'for', this.id)
        return true;
    }
}