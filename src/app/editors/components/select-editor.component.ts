import { Component, Input, Renderer, ElementRef, ViewChild } from '@angular/core';
import { PropertyEditorBaseComponent } from './property-editor-base.component.abstract';
import { InputComponent } from './input-base.component';
import { LabelComponent } from './label-base.component';
import { ToString } from '../../core/models/base.entity';

@Component({
    selector: 'app-select-editor',
    template: `
        <div #div>
            <label #label>{{alias}}</label>
            <div class="select">
                <select [(ngModel)]="entity[propertyName]">
                    <option *ngFor="let e of list" [ngValue]="e">{{e.toString()}}</option>
                </select>
            </div> 
        </div>
    `
})

export class SelectEditorComponent extends PropertyEditorBaseComponent {
    @Input() list: ToString[];
    @ViewChild('div') div: ElementRef;
    @ViewChild('label') label: ElementRef;
    @ViewChild('select') input: ElementRef;

    setClass(): boolean {
        this.setElementClass(this.div, this.class, true);
        return true;
    }

    setAttribute(): boolean {
        this.setElementAttribute(this.input, 'id', this.id)
        this.setElementAttribute(this.input, "size", this.size)
        this.setElementAttribute(this.input, "placeholder", this.placeholder)
        this.setElementAttribute(this.label, 'for', this.id)
        return true;
    }
   
}