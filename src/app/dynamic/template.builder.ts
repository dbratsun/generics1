import { Injectable, Output, Component } from '@angular/core';
import { MetaDefinition, metaPropertyOptions, FieldDefinitionTypes, FieldDefinition, setFields } from '../core/decorator/meta.decorator';
import { TemplateFactory } from '../editors/editors.factory';
import { CustomerMetadata, Customer, Product } from '../core/decorator/scalable.decorator';
import 'rxjs/add/operator/map';
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

    private InsertFields(source: any, target: any, level: number) {
        const keys = Object.keys(source);
        keys.forEach(e => {
            target[e] = { metaInfo: source[e], level: level };
        })
    }

    private hasParentFields(entity: any): boolean {
      const thisClass = entity.constructor;
      const parentClass = Object.getPrototypeOf(thisClass.prototype).constructor;
      const result = Reflect.hasOwnMetadata('fields', parentClass, 'design:options');
      return result;
    }

    private getFields(entity: any, withParents: boolean, level: number): any {
        const thisClass = entity.constructor;
        const metaInfo = Reflect.getOwnMetadata('fields', thisClass, 'design:options');
        const info = metaInfo.map(object => { return { metaInfo: object, level: level}});
        if (this.hasParentFields(entity) && withParents) {
            const parentClass = Object.getPrototypeOf(thisClass.prototype);
            const parentInfo = this.getFields(parentClass, withParents, level + 1);
            this.InsertFields(parentInfo, info, level + 1);
        }
        return metaInfo;
    }

    public prepareTemplate(entity: any, useTextarea: boolean){
        const globalMetaInfo = Reflect.getMetadataKeys(entity.constructor, 'design:options');
        const hasFieldsDef = globalMetaInfo.findIndex(definition => definition == 'fields') > -1;
        const metaInfo = Reflect.getOwnMetadata('fields', entity.constructor, 'design:options');
        // const fields = Object.keys(metaInfo);
        // let a = this.getFields(entity);
        let def: FieldDefinition[] = new Array<FieldDefinition>();
        // const fieldsmetaInfo = this.getFields(entity, true, 0);
        const fieldsmetaInfo = setFields(def, entity, true, 0);
        const fields = Object.keys(fieldsmetaInfo);
        let editor = '';
        let template = '<form> ';
        let index = 0;
        for (var i in fieldsmetaInfo) {
            ++index;
        }
        index = 0;

        // CustomerMetadata();
        // Dummy();

        const c = new Customer();

        // const tf = new TemplateFactory();
        // const tp = tf.createTemplate(entity);

        for (var prop in fieldsmetaInfo) {
        // fields.forEach(propertyName => {
            let propertyName = prop.toString();
            index++;
            // const property = metaInfo[propertyName];
            const property = fieldsmetaInfo[propertyName];
            switch (property.metaInfo.type) {
                case 'String': {
                    editor = 'app-string-editor';
                    break;
                }
                case 'Number': {
                    editor = 'app-number-editor';
                    break;
                }
            }
            const alias = property.metaInfo.definition.alias;
            const alias1 = property.metaInfo.definition['alias'];
            const id = 'f_' + index;
            template += `
                <${editor} [propertyName]="'${propertyName}'" [entity]="entity" [id]="'${id}'" `;

            for (var m in FieldDefinitionTypes) {
              var isValueProperty = parseInt(m, 10) >= 0
              if (isValueProperty) {
                  if (property.metaInfo.definition[metaPropertyOptions[m]]) {
                    const value = property.metaInfo.definition[metaPropertyOptions[m]];
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
        // });
        };
        return template + '</form>';
    }
}
