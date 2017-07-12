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

        fields.forEach(propertyName => {
            const property = metaInfo[propertyName];
            switch (property.type) {
                case 'String': {
                    editor = 'app-string-editor';
                    break;
                }
                case 'Number': {
                    editor = 'app-number-editor';
                    break;
                }
            }
            template += `
                <${editor}
                    [propertyName]="'${propertyName}'"
                    [entity]="entity"
                ></${editor}>`;
            
        });
        return template + '</form>';
    }
}
