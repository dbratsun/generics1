import 'reflect-metadata';

export enum metaPropertyOptions {
    alias,
    size,
    placeholder
}

export class MetaDefinition {
    constructor(public propertyName: string, public propertyType: string) {}
}

function MetaClassDecorator(className: string) {
    console.log(className);
    return function (target) {
        const types = Reflect.getMetadata('design:paramtypes', target);
        const metaInfo: MetaDefinition[] = new Array<MetaDefinition>();
        const s = types.map(a => a.name)
        s.forEach(element => {
            const m = new MetaDefinition('', element);
            metaInfo.push(m);
        });
        Reflect.defineMetadata('types', metaInfo, target.prototype);
        // console.log('Decorator class:', target.prototype);
        // console.log('Types:', types);
    }
}

export const MetaPropertyDecorator = (options): PropertyDecorator => {
    return (target: Function, property) => {
        const entity = target.constructor.prototype;
        const proto = target.prototype;
        const protoConstructor = target.constructor.prototype;
        console.log('property target: ', target, ' property name: ', property);
        const metadata = Reflect.getMetadata('options', entity) || {}
        const propertyType = Reflect.getMetadata('design:type', entity, property);
        const propertyMetadata = Reflect.getMetadata('propMetadata', target);
        const annotationsMetadata = Reflect.getMetadata('annotations', target);
        metadata[property] = {type: propertyType.name, options: options};
        Reflect.defineMetadata('options', metadata, entity);
    }
}

const formatMetadataKey = Symbol("format");

export function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

export function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

export function CustomComponent(annotation: any) {
  return function (target: Function) {
    var parentTarget = Object.getPrototypeOf(target.prototype).constructor;
    var pT = target.prototype.constructor;
    var Target = target.prototype;
    var parentPropMetadata = Reflect.getMetadata('options', parentTarget);
    var targetPropMetadata = Reflect.getMetadata('options', Target);
  };
}

export function isTestable(value) {
    return function decorator(target) {
        target.isTestable = value;
    }
}

// Another test: https://hackernoon.com/implementing-custom-component-decorator-in-angular-4d037d5a3f0d
//
// const Reflect = global['Reflect'];
//

export const defaultProps = {
    selector: undefined,
    template: undefined,
    dummy: undefined
}

export function CustomComponentDecorator(_props) {
    _props = Object.assign({}, defaultProps, _props);
    return function (cls) {
        Reflect.defineMetadata('annotations', [_props], cls);
    }
}

// test Component

@CustomComponentDecorator({
    selector: 'app-test-component',
    template: `<div></div>`,
})
export class TestCustomComponentDecoratorComponent {
    name = 'Test';
}

//
//
//

export const FIELD_METADATA_KEY = 'Field';

export enum FieldDefinitionTypes {
    alias,
    size,
    placeholder
}

export enum StringEditorTypes {
    text,
    url,
    email,
    password
}

export enum NumberEditorTypes {
    number
}

export interface StringEditorOptions {
    type?: StringEditorTypes
}

export interface NumberEditorOptions {
    type?: NumberEditorTypes; 
    max?: number;       // specifies the maximum value allowed
    min?: number;       // specifies the minimum value allowed
    step?: number;      // specifies the legal number intervals
    value?: number      // specifies the default value
}

export interface FieldDefinition {
    type?: string;
    definition?: FieldDecorator
}

export interface FieldDecorator {
    alias?: string;
    string_options?: StringEditorOptions;
    number_options?: NumberEditorOptions;
    size?: number;
    description?: string;
    placeholder?: string;
}

export const Field = (fieldDef: FieldDecorator): PropertyDecorator => {
    return (target: Function, property) => {
        const entity = target.constructor; // .constructor; // .prototype;
        // Reflect.defineMetadata('test1', 'teststring', entity);
        console.log('entity: ', entity.toString(), 'property name: ', property);
        const proto = Object.getPrototypeOf(target.constructor);
        if (target.prototype) {
            const proto1 = Object.getPrototypeOf(target.prototype).constructor;
        }
        // console.log('constructor: ', proto);
        const classdef = target.constructor;
        var metaData: FieldDefinition;
        metaData = Reflect.getOwnMetadata('fields', entity, 'design:options') || {};
        const propertyType = Reflect.getOwnMetadata('design:type', target, property);
        metaData[property] = {
            type: propertyType.name,
            definition: fieldDef
        };
        Reflect.defineMetadata('fields', metaData, entity, 'design:options');
        // const testValue = Reflect.getMetadata('fields', entity, 'design:options');
        // const properties = Object.keys(testValue);
    }
}

export function CustomClassDecorator(annotation: any) {
    return function (target: Function) {
        const entity = target;
        if (entity) {
            // const metaData = Reflect.getMetadata('design:options', entity);
            Reflect.defineMetadata('other', annotation, entity, 'design:options');
        }
    }
}


/*

export function Field1(field: FieldDecorator) {
  const a = Reflect.metadata(FIELD_METADATA_KEY, field);
  return a;
}

export class Product {
  @Field({
    alias: 'Product Id'
  })
  ProductID: string;

  @Field({
    alias: 'Product Name',
    description: 'This is Product'
    // compiling error: dummy: 'test'
  })
  ProductName: string;

  UnitPrice: number; //not decorated
}
*/

export class FieldDefinition {
    constructor (public metaInfo: any, public level: number) { }
}

function InsertFields(source: any, target: any, level: number): void {
    const keys = Object.keys(source);
    keys.forEach(e => {
        target[e] = { metaInfo: source[e], level: level };
    })
}

function hasParentFields(entity: any): boolean {
      const thisClass = entity.constructor;
      const parentClass = Object.getPrototypeOf(thisClass.prototype).constructor;
      const result = Reflect.hasOwnMetadata('fields', parentClass, 'design:options');
      return result;
}

export function setFields(definition: FieldDefinition[], entity: any, withParents: boolean, level: number): any {
        const thisClass = entity.constructor;
        const metaInfo = Reflect.getOwnMetadata('fields', thisClass, 'design:options');
        if (!definition) {
            definition = new Array<FieldDefinition>();
        }
        const keys = Object.keys(metaInfo);
        keys.forEach(k => {
            let info = new FieldDefinition(metaInfo[k], level);
            definition.push(info);
        })
        if (hasParentFields(entity) && withParents) {
            const parentClass = Object.getPrototypeOf(thisClass.prototype);
            const parentInfo = setFields(definition, parentClass, withParents, level + 1);
            // this.InsertFields(definition, parentInfo, info, level + 1);
        }
        let sorted: FieldDefinition[] = definition.sort((obj1, obj2) => {
            if (obj1.level < obj2.level) { return 1 };
            if (obj1.level > obj2.level) { return -1 };
            return 0;
        })
        return sorted;
}




