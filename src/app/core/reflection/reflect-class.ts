import 'reflect-metadata';
export namespace ClassReflection {
    "use strict";
    // Property definition

    export interface PropertyOptionsCommon<T> {
        defaultOrder?: number
        level?: number;
        alias?: string;
        description?: string;
        defaultValue?: T
    }

    export interface PropertyOptionsBase<T> extends PropertyOptionsCommon<T> {
        required?: boolean;
        searchable?: boolean;
        sortable?: boolean;
        size?: number;
        placeholder?: string;
    }

    export type PropertyCommonMap<T> = {
        [P in keyof T]?: PropertyOptionsCommon<T[P]>;
    }

    export type PropertyBaseMap<T> = {
        [P in keyof T]?: PropertyOptionsBase<T[P]>;
    }

    // Class Definition

    abstract class ClassDefinitionCommon {
        constructor(public className: string) {}
        abstract setProperties(prop: any, propName: string, defaultOrder: number, level: number);
    }

    class ClassDefinition<T> extends ClassDefinitionCommon {
        public properties: PropertyCommonMap<T>;
        constructor(className: string) {
            super(className);
            this.properties = {}
        }
        setProperties(prop: any, propName: string, defaultOrder: number, level: number) {
            this.properties[propName] = prop;
            this.properties[propName].defaultOrder = defaultOrder;
            this.properties[propName].level = level;
        }
    }

    export interface ClassDefinitionDictionary {
        [key: string]: ClassDefinitionCommon;
    }

    // Factory

    export let MetaFactory: ClassDefinitionDictionary = {};

    function findClassDefinition(className: string): ClassDefinitionCommon {
        for (var c in MetaFactory) {
            if (className == MetaFactory[c].className) {
                return MetaFactory[c];
            }
        }
        return null;
    }

    function GetMaxPropertiesLevel(entity: any, level: number): number {
        const o = Object.getPrototypeOf(entity);
        if (MetaFactory[o.name]) {
            return GetMaxPropertiesLevel(o, ++level);
        }
        else {
            return level;
        }
    }

    function DefineMapFromParents<T>(entity: any, level: number) {
        let c = findClassDefinition(entity.name);
        if (c == null) {
            const classDef = new ClassDefinition<T>(entity.name);
            MetaFactory[entity.name] = classDef;
        }
        const o = Object.getPrototypeOf(entity);
        let order = 0;
        const parent = MetaFactory[o.name];
        if (parent) {
            const props = (parent as ClassDefinition<T>).properties;
            for (let propertyName in props) {
                MetaFactory[entity.name].setProperties(props[propertyName], propertyName, order++, level)
            }
            DefineMapFromParents<T>(o, level-1);
        }
    }

    export function DefineMap<T>(entity: new (...args: any[]) => T, props: PropertyCommonMap<T>): void {
        const i = 0;
        const maxlevel = GetMaxPropertiesLevel(entity, 0);
        const o = Object.getPrototypeOf(entity);
        if (o.name != '') {
            const prototypeName = MetaFactory[o.name];
            DefineMapFromParents<T>(entity, maxlevel-1);
        }
        let order = 0;
        let classDef = findClassDefinition(entity.name);
        if (!classDef) {
            classDef = new ClassDefinition<T>(entity.name);
            MetaFactory[entity.name] = classDef;
        }
        for (let propertyName in props) {
            if (props.hasOwnProperty(propertyName)) {
                MetaFactory[classDef.className].setProperties(props[propertyName], propertyName, order++, maxlevel)
            }
        }
    }

    export function MetadataType(metaFunction: Function) {
        return function (target: Function) {
            metaFunction();
        }
    }
    
}