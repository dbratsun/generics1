import { Injectable } from '@angular/core';
import { ClassReflection } from '../core/reflection/reflect-class';
import { Product, Customer, MyClass } from '../core/reflection/sampleClasses';

@Injectable()
export class DynamicTemplateBuilder {
    public prepareTemplate(entity: any, useTextarea: boolean) { 
        const r = ClassReflection.MetaFactory;
        // const customer = new Customer();
        var cust: Customer;
        let template = '<form> ';
        return template + '</form>';
    }    
}