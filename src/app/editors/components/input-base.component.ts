import { Component, Input, ViewChild, ElementRef, Renderer} from '@angular/core';
import { PropertyBaseComponent } from './property-base.component.abstract'

@Component({
    selector: 'app-input',
    template: `<input #input [type]="type" [(ngModel)]="entity[propertyName]">`
})

export class InputComponent extends PropertyBaseComponent {
    @Input() type: string;
    @Input() size: string;
    @Input() placeholder: string;
    @ViewChild('input') input: ElementRef;

    setAttribute(): boolean {
        this.setElementAttribute(this.input, "size", this.size)
        this.setElementAttribute(this.input, "placeholder", this.placeholder)
        return true;
    }
}
