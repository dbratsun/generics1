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


