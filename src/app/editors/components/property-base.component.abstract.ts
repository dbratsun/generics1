import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from './base.component.abstract'

export abstract class PropertyBaseComponent extends BaseComponent {
    @Input() public propertyName: string;
    @Input() public entity: any;
}
