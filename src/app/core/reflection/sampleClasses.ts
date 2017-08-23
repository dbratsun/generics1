// import * as R from './reflect-class';

import { ClassReflection } from './reflect-class';

@ClassReflection.MetadataType(CustomerMetadata)
export class Customer {
    id: number;
    name: string;
}

export function CustomerMetadata() {
    let customerMap: ClassReflection.PropertyBaseMap<Customer> = {
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
    ClassReflection.DefineMap(Customer, customerMap)
}

@ClassReflection.MetadataType(ProductMetadata)
export class Product {
    id: number;
    name: string;
    code: number;
}

export function ProductMetadata() {
    let productMap: ClassReflection.PropertyCommonMap<Product> = {
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
    ClassReflection.DefineMap(Product, productMap);
}

// 
// custom property options
//

interface MyPropertyOptions<T> extends ClassReflection.PropertyOptionsBase<T> {
    color?: number;
}

type MyPropertyMap<T> = {
    [P in keyof T]?: MyPropertyOptions<T[P]>;
}

function MyClassMetadata() {
    let myMap: MyPropertyMap<MyClass> = {
        id: {
            defaultValue: '',
            color: 2
        },
        propertyA: {
            defaultValue: 0,
            alias: 'Property A',
            color: 5
        }
    }
    ClassReflection.DefineMap(MyClass, myMap);
}

@ClassReflection.MetadataType(MyClassMetadata)
export class MyClass {
    id: string;
    propertyA: number;
    propertyB?: number;
}

var a: MyClass = new MyClass();