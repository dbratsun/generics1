import { Component, OnInit, Input, Inject, Renderer, ElementRef, ViewChild } from '@angular/core';
import { PropertyEditorBaseComponent } from './property-editor-base.component.abstract';
import { InputComponent } from './input-base.component';
import { LabelComponent } from './label-base.component';

@Component({
    selector: 'app-property-editor',
    template: `
        <div #div>
            <label #label>{{alias}}</label>
            <input #input [type]="type" [(ngModel)]="entity[propertyName]">
            <!--
            <app-label [text]="alias" [id]="id"></app-label>
            <app-input [type]="type" [id]="id" [entity]="entity" [propertyName]="propertyName" [size]="size"></app-input>
            -->
        </div>
    `
})

export class PropertyEditorComponent extends PropertyEditorBaseComponent {
    @ViewChild('div') div: ElementRef;
    @ViewChild('label') label: ElementRef;
    @ViewChild('input') input: ElementRef;

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
