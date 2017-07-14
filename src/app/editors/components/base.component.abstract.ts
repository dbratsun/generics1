import { Component, OnInit, Renderer, Inject } from '@angular/core';

export interface OnSetAttributes {
    setAttribute(): boolean;
}

export abstract class BaseComponent implements OnInit { //, OnSetAttributes {
    constructor(@Inject(Renderer) protected render: Renderer) { 
    }
    
    protected setElementAttribute(renderElement: any, attributeName: string, attributeValue: string) {
        if (renderElement) {
            this.render.setElementAttribute(renderElement.nativeElement, attributeName, attributeValue);
        }
    }

    protected setElementClass(renderElement: any, className: string, isAdd: boolean) {
        if (renderElement) {
            this.render.setElementClass(renderElement.nativeElement, className, isAdd);
        }
    }

    ngOnInit() { 
        this.setAttribute();
        this.setClass()
    }

    setAttribute(): boolean {
        return false;
    }

    setClass(): boolean {
        return false;
    }
}