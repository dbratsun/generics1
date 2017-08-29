import { Injectable } from '@angular/core';
import { ClassReflection } from '../core/reflection/reflect-class';
import { Product, Customer, MyClass } from '../core/reflection/sampleClasses';
import { FieldDefinition, setFields } from '../core/decorator/meta.decorator';
import * as d from '../core/models/dummy';

@Injectable()
export class DynamicTemplateBuilder {
    public prepareTemplate(entity: any, useTextarea: boolean) {
        d.Dummy();

        // let def: FieldDefinition[] = new Array<FieldDefinition>();
        // const fieldsmetaInfo = setFields(def, entity, true, 0);

        const className = entity.constructor.name;   
        const def = ClassReflection.MetaFactory[className];
        let template = '<form> ';
        for (var prop in def) {
            let a = prop;
        }
        return template + '</form>';
    }
}
