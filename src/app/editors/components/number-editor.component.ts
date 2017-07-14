import { Component, Input, Renderer } from '@angular/core';
import { PropertyEditorBaseComponent } from './property-editor-base.component.abstract';

@Component({
    selector: 'app-number-editor',
    template: `
        <app-property-editor 
            app-class="form-group" 
            type="number" 
            [propertyName]="propertyName" 
            [entity]="entity" 
            [id]="id" 
            [size]="size" 
            [alias]="alias"
            [placeholder]="placeholder"> 
        </app-property-editor>`
})

export class NumberEditorComponent extends PropertyEditorBaseComponent {
    /*
    @Input() alias: string;
    @Input() id: string;
    @Input() size: string;
    @Input() placeholder: string;
    */
}