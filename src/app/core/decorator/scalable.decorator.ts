// import { Product } from './meta.decorator';
import 'reflect-metadata';

// based on https://spin.atomicobject.com/2017/04/24/typescript-modular-typesafe-metadata/

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

/*
export class ClassDefinition<T> {
    constructor(public className: string, public property: PropertyDefinitionDictionary<T>) {}
}

export interface ClassDefinitionDictionary {
    [key: string]: ClassDefinition;
}
*/

////
////

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

export class DefinitionFactory implements CDefinitionDictionary {
    [key: string]: CDefinitionCommon;
    newDefinition(className: string): void {}
}

////
////


// export let MetaFactory: ClassDefinition[] = new Array<ClassDefinition>();
export let MetaFactory: CDefinitionDictionary = {};

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

@MetadataType(CustomerMetadata)
export class Customer {
    id: number;
    name: string;
}

@MetadataType(ProductMetadata)
export class Product {
    id: number;
    name: string;
    code: number;
}

export function CustomerMetadata() {
    definePresentation(Customer, {
        id: {
            sortable: true,
            displayName: 'Customer ID',
            tableDisplay: false,
            columnWidth: 10,
            defaultValue: 0
        },
        name: {
            searchable: true,
	          sortable: true,
	          required: true,
	          displayName: 'Customer Name',
	          tableDisplay: true,
            columnWidth: 20,
            defaultValue: "Empty Customer"
        }
    })
}

export function ProductMetadata() {
    definePresentation(Product, {
        id: {
            defaultValue: 0,
            columnWidth: 10
        },
        name: {
            searchable: true,
            defaultValue: ""
        },
        code: {
            defaultValue: 0
        }
    })
}
