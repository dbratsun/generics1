// Темная сторона TypeScript — @декораторы на примерах
// https://habrahabr.ru/company/docsvision/blog/310870/

/*
import 'reflect-metadata';
function logType(target: any, key: string) { // : TypedPropertyDescriptor<String> {
      // var t = Reflect.getMetadata("design:type", target, key);
      // console.log(`${key} type: ${t.name}`);
      // return null;
}

function advancedLogType(info?: string) {
    return (target: any, propertyKey: string) => { // : TypedPropertyDescriptor<any>=> {
        console.log(`${info} - ${target} ${propertyKey}`);
        // return null;
    }
}

function parameterDecorator(target: any, methodName: string, parameterIndex: number) {
    console.log('Target: ', target);
    console.log('Method Name: ', methodName);
}


function paramTypes(target: any, key: string) {
}


function metaProperty(target: any, propertyName: string, alias: string) {
}
*/

/*
export interface IEntity {
    a: string;
    b: number;
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

// @metaClass("custom alias")
export class Entity1 {
    constructor(
        @parameterDecorator public a: string,
        @parameterDecorator public b: number
    ) { }
    @paramTypes
    doSomething() {}
}
*/
