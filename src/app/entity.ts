// Темная сторона TypeScript — @декораторы на примерах
// https://habrahabr.ru/company/docsvision/blog/310870/

import 'reflect-metadata';
function logType(target : any, key : string) { //: TypedPropertyDescriptor<String> {
      // var t = Reflect.getMetadata("design:type", target, key);
      // console.log(`${key} type: ${t.name}`);
      // return null;
}

function advancedLogType(info? : string) {
    return (target : any, propertyKey : string) => { //: TypedPropertyDescriptor<any>=> {
        console.log(`${info} - ${target} ${propertyKey}`);
        // return null;
    }
}

function parameterDecorator(target: any, methodName: string, parameterIndex: number) {
    console.log("Target: ", target);
    console.log("Method Name: ", methodName);
}


function paramTypes(target: any, key: string) {

}

export class MetaDefinition {
    constructor(public propertyName: string, public propertyType: string) {}
}

function metaClass(className: string) {
    console.log(className);
    return function (target) { 
        var types = Reflect.getMetadata("design:paramtypes", target);
        var metaInfo: MetaDefinition[] = new Array<MetaDefinition>(); 
        var s = types.map(a => a.name)
        s.forEach(element => {
            let m = new MetaDefinition("", element);
            metaInfo.push(m);
        });
        Reflect.defineMetadata("types", metaInfo, target.prototype);
        console.log('Decorator class:', target.prototype);
        console.log('Types:', types);        
    }
}

export const metaPropertyDecorator = (options): PropertyDecorator => {
    return (target, property) => {
        var entity = target.constructor.prototype;
        console.log("property target: ", entity);
        const metadata = Reflect.getMetadata("options", entity) || {}
        metadata[property] = options;
        Reflect.defineMetadata("options", metadata, entity);
    }
}

function metaProperty(target: any, propertyName: string, alias: string) {

}


export interface IEntity {
    a: string;
    b: number;
}

export interface PrimaryID {
    id: number;
}

export abstract class BaseEntity implements PrimaryID {
    @metaPropertyDecorator("This is a primary key")
    public id: number;
    constructor (id: number) {
        this.id = id;
    }
}

// @metaClass("This_is_a_sample_entity")
export class SampleEntity extends BaseEntity {
    @metaPropertyDecorator({ alias: "This is a Code", size: 10})
    public code: string;
    @metaPropertyDecorator("This is a Name")
    public name: string;
    @metaPropertyDecorator("This is a Description")
    public description?: string;

    constructor(id: number, code: string, name: string, description?: string) {
        super(id);
        this.code = code;
        this.name = name;
        this.description = description;
    }   
}

export class Entity {
    @advancedLogType('Code')
    @logType
    public Code: string;
    @logType
    public Description: string;
    @logType
    public N1: number;
    @logType
    public NNNNN: number;
    constructor(
        code: string,
        description: string,
        n1: number,
        n: number) {
            this.Code = code;
            this.Description = description;
            this.N1 = n1;
            this.NNNNN = n;
         }
}

//@metaClass("custom alias")
export class Entity1 {
    constructor(
        @parameterDecorator public a: string,
        @parameterDecorator public b: number
    ) { }
    @paramTypes
    doSomething() {}
}
