import { Component, Input } from '@angular/core';
import { PropertyBaseComponent } from './property-base.component.abstract'

export abstract class PropertyEditorBaseComponent extends PropertyBaseComponent {
    @Input() alias: string;
    @Input() type: string;
    @Input() id: string;
    @Input() size: string;
    @Input() placeholder: string;
    @Input('app-class') class: string;
}