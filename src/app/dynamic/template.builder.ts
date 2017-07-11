import { Injectable } from '@angular/core';
import { MetaDefinition } from '../core/decorator/meta.decorator';
import 'reflect-metadata';

function getClass(object) {
    const a = Object.prototype.toString.call(object);
    return a;
}

@Injectable()
export class DynamicTemplateBuilder {

    public prepareTemplate(entity: any, useTextarea: boolean){

      const properties = Object.keys(entity);

      const o = entity as Object;

      // let b = Reflect.getMetadata("design:paramtypes", entity, "Entity1");
      const exist1 = Reflect.hasMetadata('types', entity);
      const exist2 = Reflect.hasMetadata('metaClass', entity);
      const metaInfo: MetaDefinition = Reflect.getMetadata('types', entity);
      const metaInfo1 = Reflect.getMetadata('options', entity);

      let template = '<form >';

      const editorName = useTextarea
        ? 'text-editor'
        : 'string-editor';

      properties.forEach((propertyName) => {
        const p = Object.getOwnPropertyDescriptor(entity, propertyName);
        // let pp = Reflect.getOwnPropertyDescriptor(entity, propertyName);

        // let a = Reflect.ownKeys(entity);

        const a = Reflect.getMetadata('design:type', entity, propertyName);

        let editor = '';

        switch (a.name) {
            case 'String': {
                editor = 'string-editor';
                break;
            }
            case 'Number': {
                editor = 'number-editor';
                break;
            }
        }


        // let t = typeof(p);
        template += `
            <${editor}
                [propertyName]="'${propertyName}'"
                [entity]="entity"
            ></${editor}>`;

      });

      return template + '</form>';
    }
}
