namespace ClassReflection {
    // Property definition

    export interface PropertyOptionsCommon<T> {
        defaultValue?: T
    }

    export interface PropertyOptionsBase<T> extends PropertyOptionsCommon<T> {
        alias?: string;
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

    function findClassDefinition(className: string) {
        for (var c in MetaFactory) {
            if (className == MetaFactory[c].className) {
                return c;
            }
        }
        return null;
    }

    export function DefinePresentation<T>(entity: new (...args: any[]) => T, props: PropertyCommonMap<T>): void {
        for (let propertyName in props) {
            if (props.hasOwnProperty(propertyName)) {
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
    }

    export function MetadataType(metaFunction: Function) {
        return function (target: Function) {
            metaFunction();
        }
    }
    
}