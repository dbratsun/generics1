import { Injectable } from '@angular/core';
import { ClassReflection } from '../core/reflection/reflect-class';
import { Product, Customer, MyClass } from '../core/reflection/sampleClasses';
import * as d from '../core/models/dummy';

@Injectable()
export class DynamicTemplateBuilder {
    public prepareTemplate(entity: any, useTextarea: boolean) {
        d.Dummy();
        const r = ClassReflection.MetaFactory;
        // const customer = new Customer();
        var cust: Customer;
        let template = '<form> ';
        return template + '</form>';
    }
}
