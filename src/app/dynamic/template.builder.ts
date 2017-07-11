import { Injectable } from "@angular/core";
import { MetaDefinition } from "../entity";
import 'reflect-metadata';

function getClass(object) {
    let a = Object.prototype.toString.call(object);
    return a;
}

@Injectable()
export class DynamicTemplateBuilder {

    public prepareTemplate(entity: any, useTextarea: boolean){
      
      let properties = Object.keys(entity);

      let o = entity as Object;

      // let b = Reflect.getMetadata("design:paramtypes", entity, "Entity1");
      let exist1 = Reflect.hasMetadata("types", entity);
      let exist2 = Reflect.hasMetadata("metaClass", entity);
      let metaInfo: MetaDefinition = Reflect.getMetadata("types", entity);
      let metaInfo1 = Reflect.getMetadata("options", entity);

      let template = "<form >";

      let editorName = useTextarea 
        ? "text-editor"
        : "string-editor";

      for (let a in o) {
          let t = typeof(a);
          let p = a;
      }  

        // http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4

      properties.forEach((propertyName) =>{
        let p = Object.getOwnPropertyDescriptor(entity, propertyName);
        // let pp = Reflect.getOwnPropertyDescriptor(entity, propertyName);

        // let a = Reflect.ownKeys(entity);

        let a = Reflect.getMetadata("design:type", entity, propertyName);

        let editor = "";

        switch (a.name) {
            case "String": { 
                editor = "string-editor";
                break;
            }
            case "Number": { 
                editor = "number-editor";
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
  
      return template + "</form>";
    }
}
