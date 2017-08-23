import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

import { MetaPropertyDecorator, format, CustomComponent, isTestable, Field, CustomClassDecorator } from '../decorator/meta.decorator';
import { BaseEntity, ToString } from './base.entity';
import { Unit } from './unit.entity';

// @metaClass("This_is_a_sample_entity")
// cannot extend base class - problems with entity
// @CustomComponent('test')
// @isTestable(true)
@CustomClassDecorator('test')
export class Material  extends BaseEntity implements ToString {
    // @MetaPropertyDecorator({alias: 'ID', description: 'This is a primary key' })
    /*
    @Field({
        alias: 'ID2',
        description: 'This is a primary key'
    })
    public id: number;
    // @format("Hello, %s")
    */
    @Field({
        alias: 'Name',
        size: 35,
        description: 'This is a Name'
    })
    public name: string;
    // @MetaPropertyDecorator({alias: 'Shortname', size: 60, description: 'This is a Shortname'})
    // @MetaPropertyDecorator({alias: 'Code', size: 3, description: 'This is a Code', placeholder: 'please enter the code'})

    @Field({
        alias: 'Code',
        size: 3,
        description: 'This is a Code',
        placeholder: 'please enter the code'
    })
    public code: number;
    // @MetaPropertyDecorator({alias: 'Name', size: 35, description: 'This is a Name'})

    @Field({
        alias: 'Shortname',
        size: 60,
        description: 'This is a Shortname'
    })
    public shortname: string;

    // @MetaPropertyDecorator({alias: 'Description', size: 50, description: 'This is a Description', placeholder: 'please write here a short Description'})
    @Field({
        alias: 'Description',
        size: 50,
        description: 'This is a Description',
        placeholder: 'please write here a short Description'
    })
    public description?: string;


    // @MetaPropertyDecorator({alias: 'Unit', size: 60, description: 'This is a Unit'})
    // public unit: Unit;
    // private formatedString: string;

    constructor(id: number, code: number, name: string /*, unit?: Unit */ , shortname: string, description?: string ) {
        super(id);
        // this.id = id;
        this.code = code;
        this.name = name;
        // this.unit = unit;
        this.shortname = shortname;
        this.description = description;
    }

    public toString(): string {
        return this.name;
    }
}
