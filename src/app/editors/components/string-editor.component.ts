import { Component, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { PropertyEditorBaseComponent } from './property-editor-base.component.abstract';

@Component({
    selector: 'app-string-editor',
    template: `
        <app-property-editor 
            app-class="form-group" 
            type="text" 
            [alias]="alias"
            [propertyName]="propertyName" 
            [entity]="entity" 
            [id]="id" 
            [size]="size"
            [placeholder]="placeholder"> 
        </app-property-editor>`
})
export class StringEditorComponent extends PropertyEditorBaseComponent {
}