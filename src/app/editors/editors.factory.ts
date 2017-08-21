import { FieldDecorator, FieldDefinition, setFields } from '../core/decorator/meta.decorator';


export enum EditorAliases {
    StringPropertyEditor,
    NumberPropertyEditor
}

export abstract class Editor {
    public type: string;
    public definition: string;
    constructor (type: string, definition: string) {
        this.type = type;
        this.definition = definition;
    }
}

export class StringEditor extends Editor {
    constructor (definition: string) {
        super('string', definition);
    }
}

export class NumberEditor extends Editor {
    constructor (definition: string) {
        super('number', definition);
    }
}

export interface EditorFactory {
    createEditor(decorator: any): Editor
}

export class StringEditorFactory implements EditorFactory {
    createEditor(decorator: any): StringEditor {
        return new StringEditor('<app-string-editor></app-string-editor>');
    }
}

export class NumberEditorFactory implements EditorFactory {
    createEditor(decorator: any): StringEditor {
        return new StringEditor('<app-number-editor></app-number-editor>');
    }
}

export class TemplateFactory {
    createTemplate(entity: any) {
        let def: FieldDefinition[] = new Array<FieldDefinition>();
        const fieldsmetaInfo = setFields(def, entity, true, 0);
        const fields = Object.keys(fieldsmetaInfo);
        let index = 0;
        let editor = '';
        let template = '';
        for (var prop in fieldsmetaInfo) {
            let propertyName = prop.toString();
            index++;
            const property = fieldsmetaInfo[propertyName];
            switch (property.metaInfo.type) {
                case 'String': {
                    editor = new StringEditorFactory().createEditor(property).definition;
                    break;
                }
                case 'Number': {
                    editor = new NumberEditorFactory().createEditor(property).definition;
                    break;
                }
            }           
            template += `${editor}`;
        }
        return template;
    }
}

