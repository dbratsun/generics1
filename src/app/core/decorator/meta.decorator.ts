import 'reflect-metadata';

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
        console.log('Decorator class:', target.prototype);
        console.log('Types:', types);
    }
}

export const MetaPropertyDecorator = (options): PropertyDecorator => {
    return (target, property) => {
        const entity = target.constructor.prototype;
        console.log('property target: ', entity);
        const metadata = Reflect.getMetadata('options', entity) || {}
        metadata[property] = options;
        Reflect.defineMetadata('options', metadata, entity);
    }
}
