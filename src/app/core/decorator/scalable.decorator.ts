namespace ClassReflection1 {
// import { Product } from './meta.decorator';
// import 'reflect-metadata';

// based on https://spin.atomicobject.com/2017/04/24/typescript-modular-typesafe-metadata/

/*
interface PresentationOptionCommon {
    required?: boolean;
    searchable?: boolean;
    sortable?: boolean;
    displayName?: string;
    tableDisplay?: boolean;
    columnWidth?: number;
}

interface PresentationOptions<PropertyType> {
    required?: boolean;
    searchable?: boolean;
    sortable?: boolean;
    displayName?: string;
    tableDisplay?: boolean;
    columnWidth?: number;
    defaultValue?: PropertyType;
}

type PropertyPresentationMap<T> = {
  [P in keyof T]?: PresentationOptions<T[P]>;
};

export class PropertyDefinition<T> {
    constructor(public propertyName: string, public options: PresentationOptions<T>[]) {

    }
}

export interface PropertyDefinitionDictionary<T> {
    [key: string]: PropertyPresentationMap<T>
}

*/

/*
export class ClassDefinition<T> {
    constructor(public className: string, public property: PropertyDefinitionDictionary<T>) {}
}

export interface ClassDefinitionDictionary {
    [key: string]: ClassDefinition;
}
*/

/*

export interface IDefinition<T> {
    className: string;
    properties: PropertyPresentationMap<T>
}

abstract class CDefinitionCommon {
    constructor(public className: string) {}
    abstract setProperties(prop: any, propName: string);
}

class CDefinition<T> extends CDefinitionCommon {
    public properties: PropertyPresentationMap<T>;
    constructor(className: string) {
        super(className);
        this.properties = {}
    }
    setProperties(prop: any, propName: string) {
        this.properties[propName] = prop;
    }
}

export interface CDefinitionDictionary {
    [key: string]: CDefinitionCommon;
}

*/

/*
export class DefinitionFactory implements CDefinitionDictionary {
    [key: string]: CDefinitionCommon;
    newDefinition(className: string): void {}
}
*/

/*
export function findClassDefinition(className: string) {
  for (var c in MetaFactory) {
    if (className == MetaFactory[c].className) {
        return c;
    }
  }
  return null;
}

export function definePresentation<T>(entity: new (...args: any[]) => T, props: PropertyPresentationMap<T>): void {
  for (let propertyName in props) {
    if (props.hasOwnProperty(propertyName)) {
      // presentableProperties.push(propertyName);
      Reflect.defineMetadata("scalable", props[propertyName], entity.prototype, propertyName);
      // let index = MetaFactory.findIndex(element => element.className == entity.prototype);
      let c = findClassDefinition(entity.name);
      let p = props[propertyName]
      if (c != null) {
        const classDef = MetaFactory[c];
        MetaFactory[c].setProperties(props[propertyName], propertyName)
        // const e = MetaFactory[c].properties.push(props[propertyName])
      }
      else {
        const classDef = new CDefinition<T>(entity.name);
        classDef.setProperties(props[propertyName], propertyName);
        MetaFactory[entity.name] = classDef;
        // const a = {};
        //Object.assign(a, p);
        // const e = MetaFactory[entity.name].property.push(a);
      }
    }
  }
  const meta = Reflect.getMetadata("scalable", entity.prototype, 'name');
}

export function MetadataType(metaFunction: Function) {
  return function (target: Function) {
      metaFunction();
      const meta = Reflect.getMetadata('scalable', target.prototype, 'name');
  }
}

*/


// Property definition

    interface PropertyOptionsCommon<PropertyType> {
        defaultValue?: PropertyType
    }

    interface PropertyOptionsBase<PropertyType> extends PropertyOptionsCommon<PropertyType> {
        alias?: string;
        required?: boolean;
        searchable?: boolean;
        sortable?: boolean;
        size?: number;
        placeholder?: string;
    }

    type PropertyCommonMap<T> = {
        [P in keyof T]?: PropertyOptionsCommon<T[P]>;
    }

    type PropertyBaseMap<T> = {
        [P in keyof T]?: PropertyOptionsBase<T[P]>;
    }

    /*
    export class PropertyDefinition<T> {
        constructor(public propertyName: string, public options: PropertyOptionsCommon<T>[]) {
        }
    }
    */

    /*
    export interface PropertyDefinitionDictionary<T> {
        [key: string]: PropertyMap<T>
    }
    */
    // Class definition

    /*
    export interface IClassDefinition<T> {
        className: string;
        properties: PropertyMap<T>
    }
    */

    abstract class ClassDefinitionCommon {
        constructor(public className: string) {}
        abstract setProperties(prop: any, propName: string);
    }

    class ClassDefinition<T> extends ClassDefinitionCommon {
        public properties: PropertyCommonMap<T>;
        constructor(className: string) {
            super(className);
            this.properties = {}
        }
        setProperties(prop: any, propName: string) {
            this.properties[propName] = prop;
        }
    }

    export interface ClassDefinitionDictionary {
        [key: string]: ClassDefinitionCommon;
    }

    // Factory

    export let MetaFactory: ClassDefinitionDictionary = {};

    export function findClassDefinition(className: string) {
    for (var c in MetaFactory) {
        if (className == MetaFactory[c].className) {
            return c;
        }
    }
    return null;
    }

    export function definePresentation<T>(entity: new (...args: any[]) => T, props: PropertyCommonMap<T>): void {
    for (let propertyName in props) {
        if (props.hasOwnProperty(propertyName)) {
        // Reflect.defineMetadata("scalable", props[propertyName], entity.prototype, propertyName);
        let c = findClassDefinition(entity.name);
        let p = props[propertyName]
        if (c != null) {
            const classDef = MetaFactory[c];
            MetaFactory[c].setProperties(props[propertyName], propertyName)
        }
        else {
            const classDef = new ClassDefinition<T>(entity.name);
            classDef.setProperties(props[propertyName], propertyName);
            MetaFactory[entity.name] = classDef;
        }
        }
    }
    // const meta = Reflect.getMetadata("scalable", entity.prototype, 'name');
    }

    export function MetadataType(metaFunction: Function) {
    return function (target: Function) {
        metaFunction();
        // const meta = Reflect.getMetadata('scalable', target.prototype, 'name');
    }
    }

@MetadataType(CustomerMetadata)
export class Customer {
    id: number;
    name: string;
}

export function CustomerMetadata() {
    let customerMap: PropertyBaseMap<Customer> = {
        id: {
            defaultValue: 0,
            sortable: true
        },
        name: {
            defaultValue: "",
            alias: "Name",
            sortable: true,
            searchable: true
        }
    }
    definePresentation(Customer, customerMap)
}

@MetadataType(ProductMetadata)
export class Product {
    id: number;
    name: string;
    code: number;
}

export function ProductMetadata() {
    let productMap: PropertyCommonMap<Product> = {
        id: {
            defaultValue: 0
        },
        name: {
            defaultValue: ""
        },
        code: {
            defaultValue: 0
        }
    }
    definePresentation(Product, productMap);
}

}