import { MetaPropertyDecorator, Field, CustomClassDecorator, StringEditorTypes, StringEditorOptions, NumberEditorTypes, NumberEditorOptions } from '../decorator/meta.decorator';
import { BaseEntityOld, ToStringOld } from './base.entity.old';


// @metaClass("This_is_a_sample_entity")
@CustomClassDecorator('test')
export class UnitOld extends BaseEntityOld implements ToStringOld  {
    // @MetaPropertyDecorator({alias: 'ID', size: 10, description: 'This is a ID'})
    /*
    @Field({
        alias: 'ID1',
        description: 'This is a primary key'
    })
    public id: number;
    */
    // @MetaPropertyDecorator({alias: 'ShortName', size: 10, description: 'This is a Shortname'})
    @Field({
        alias: 'ShortName',
        string_options: {
            type: StringEditorTypes.text    
        },
        size: 10,
        description: 'This is a Shortname',
        placeholder: ''
    })
    public shortname: string;

    // @MetaPropertyDecorator({alias: 'Code', size: 10, description: 'This is a Code'})
    @Field({
        alias: 'Unitcode', size: 10, description: 'This is a Code',
        number_options: {
            type: NumberEditorTypes.number,
            min: 1,
            max: 10
        }
    })
    public code: number;

    // @MetaPropertyDecorator({alias: 'Name', description: 'This is a Name'})
    @Field({
        alias: 'Name',
        description: 'This is a Name'
    })
    public name: string;

    // @MetaPropertyDecorator({alias: 'Description', description: 'This is a Description'})
    @Field({
        alias: 'Description',
        description: 'This is a Description'
    })
    public description?: string;

    constructor(id: number, shortname: string, unitcode: number, name: string, description?: string) {
        super(id);
        // this.id = id;
        this.shortname = shortname;
        this.code = unitcode;
        this.name = name;
        this.description = description;
    }

    public toString(): string {
        return this.shortname;
    }
}
