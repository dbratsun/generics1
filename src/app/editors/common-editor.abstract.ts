import {Component, OnInit, Input, ViewChild, ElementRef, Renderer} from '@angular/core';
import {Observable} from 'rxjs/Rx';

export abstract class CommonEditor implements OnInit{
    @Input() public propertyName: string;
    @Input() public alias: string;
    @Input() public entity: any;
    @Input() public size: string;
    @ViewChild('input') input: ElementRef;

    // private render: Renderer;

    constructor( protected render: Renderer ) {
    }

    ngOnInit() {
      if (this.input) {
        this.SetElements();
      }
    }

    protected SetElementAttribute(attributeName: string, attributeValue: string) {
      this.render.setElementAttribute(this.input.nativeElement, attributeName, attributeValue);
    }

    protected SetElements() {
      if (this.alias == null) {
        this.alias = this.propertyName
      }
      // if (this.input) {
        if (this.size) {
          // this.SetElementAttribute("size", this.size);
          this.render.setElementAttribute(this.input.nativeElement, "size", this.size.toString())
        }
      // }
    }
}
