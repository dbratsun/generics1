import { Type, ClassDefinition, TypeDecorator } from '@angular/core';
export abstract class Decorator {
    constructor() {}
    private _typeId: any;

    get typeId(): any {
        return this._typeId;
    }

    public GetCustomDecorator(element: ClassDefinition, decoratorType: Type): Decorator {

    }

}


export interface BaseInfo {
    _decorators: TypeDecorator[]

}




