import { Injectable } from '@angular/core';
import { MetaDefinition } from '../core/decorator/meta.decorator';
import 'reflect-metadata';

/*
function getClass(object) {
    const a = Object.prototype.toString.call(object);
    return a;
}
*/

@Injectable()
export class DynamicTemplateBuilder {

    public prepareTemplate(entity: any, useTextarea: boolean){
        const metaInfo = Reflect.getMetadata('options', entity);
        const fields = Object.keys(metaInfo);
        let editor = '';
        let template = '<form>';
        let index = 0;
        fields.forEach(propertyName => {
            index++;
            const property = metaInfo[propertyName];
            switch (property.type) {
                case 'String': {
                    editor = 'app-clarity-string-editor';
                    break;
                }
                case 'Number': {
                    editor = 'app-clarity-number-editor';
                    break;
                }
            }
            const alias = property.options.alias;
            const id = 'formField_' + index;
            template += `
                <${editor} [propertyName]="'${propertyName}'"
                           [entity]="entity"
                           [alias]="'${alias}'"
                           [id]="'${id}'"
                           [size]=30></${editor}>`;
        });
        return template + '</form>';
    }
}
