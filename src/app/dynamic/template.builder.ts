import { Injectable, Output } from '@angular/core';
import { MetaDefinition, metaPropertyOptions } from '../core/decorator/meta.decorator';
import 'reflect-metadata';

/*
function getClass(object) {
    const a = Object.prototype.toString.call(object);
    return a;
}
*/

export enum decoratorOptions {

}

@Injectable()
export class DynamicTemplateBuilder {

    public prepareTemplate(entity: any, useTextarea: boolean){
        const metaInfo = Reflect.getMetadata('options', entity);
        const fields = Object.keys(metaInfo);
        let editor = '';
        let template = '<form> ';
        let index = 0;
        fields.forEach(propertyName => {
            index++;
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
            const alias = property.options.alias;
            const alias1 = property.options['alias'];
            const id = 'f_' + index;
            template += `
                <${editor} [propertyName]="'${propertyName}'" [entity]="entity" [id]="'${id}'" `;

            for (var m in metaPropertyOptions) {
              var isValueProperty = parseInt(m, 10) >= 0
              if (isValueProperty) {
                  if (property.options[metaPropertyOptions[m]]) {
                    const value = property.options[metaPropertyOptions[m]];
                    const s = `[${metaPropertyOptions[m]}]="'${value}'" `;
                    template += s;
                  }
              }
            }
            template += `></${editor}>`
            /*
                           [alias]="'${alias}'"
                           [id]="'${id}'"
                           [size]=30></${editor}>`;
            */
        });
        return template + '</form>';
    }
}
