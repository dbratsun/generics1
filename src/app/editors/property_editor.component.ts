import { Component, OnInit, Input, Inject, Renderer, ElementRef, ViewChild } from '@angular/core';

export class PropertyEditorAttribute {
    constructor (
        public target: any,
        public name: string,
        public type: string,
        public alias?: string,
        public value?: any ) {}
}

export interface ISetAttribute {
    setAttribute(attribute: PropertyEditorAttribute): boolean;
}

/*
export class PropertyEditorBaseAttribute {
    public propertyName: string;
    public entity: any;    
}

export class PropertyEditorAttribute extends PropertyEditorBaseAttribute {
    public alias: string;
    public id: string;
    public type: string;
    public size: string;
    public placeholder: string;    
}
*/

abstract class PropertyEditor implements OnInit {
    private attribute: PropertyEditorAttribute[];
    
    constructor(@Inject(Renderer) protected render: Renderer) { 
        this.attribute = new Array<PropertyEditorAttribute>();
    }
    
    private hasAttribute(name: string): boolean {
        return this.attribute.findIndex(e => e.name === name) > 0;
    }

    protected addAttribute(target: any, name: string, type: string, alias?: string, value?: any) {
        this.attribute.push(new PropertyEditorAttribute(target, name, type, alias, value));
        this.setElementAttribute(target, name, value);        
    }

    protected getAttribute(name: string): PropertyEditorAttribute {
        let index = this.attribute.findIndex(e => e.name === name);
        if (index > 0) 
            return this.attribute[index]
        else
            return null;
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
        this.setClass()
    }

    protected setAttribute(attribute: PropertyEditorAttribute[]): boolean {
        attribute.forEach(a => {
            this.addAttribute(a.target, a.name, a.type, a.alias, a.value)
        })
        return true;
    }
    abstract setClass(): boolean; 
}

export class PropertyEditorComponent1 extends PropertyEditor implements OnInit {
    @Input() attr: PropertyEditorAttribute[]
    ngOnInit() {
        // this.setAttribute(this.attr);
    }
    /*
    setAttribute(): boolean {
        this.addAttribute(this.input, "id", "string", "", this.id);        
        return true;
    }
    */    
    setClass(): boolean {
        return true;
    }
}

@Component({
    selector: 'app-stringeditor-1',
    template: `
        <label #label>{{text}}"><label>
        <input #input>
    `
})
export class StringEditorComponent1 extends PropertyEditorComponent1 {
    @Input() id: string;
    @Input() text: string;
    @ViewChild('input') input: ElementRef;
    @ViewChild('label') label: ElementRef;
}

@Component({
    selector: 'app-propertyeditor-input-1',
    template: `
        <input #input>    
    `
})
export class PropertyEditorInputComponent1 extends PropertyEditorComponent1 {
    @Input() id: string;
    @ViewChild('input') input: ElementRef;
    setAttribute(): boolean {
        this.addAttribute(this.input, "id", "string", "", this.id);        
        return true;
    }    
    setClass(): boolean {
        return true;
    }

}

@Component({
    selector: 'app-propertyeditor-label-1',
    template: `
        <label #label>{{text}}</label>    
    `
})
export class PropertyEditorLabelComponent1 extends PropertyEditorComponent1 {
    @Input() for: string;
    @Input() text: string;
    @ViewChild('label') label: ElementRef;
    setAttribute(): boolean {
        this.addAttribute(this.label, "for", "string", "", this.for);        
        return true;
    }    
    setClass(): boolean {
        return true;
    }
}

