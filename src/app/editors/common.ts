import {Component, Input} from '@angular/core';
import {Observable}       from "rxjs/Rx";

export abstract class CommonEditor {
    @Input() public propertyName: string;
    @Input() public entity: any;
}