import { MetaPropertyDecorator } from '../decorator/meta.decorator';
import { BaseEntity, ToString } from './base.entity';


// @metaClass("This_is_a_sample_entity")
export class Unit extends BaseEntity implements ToString  {
    // @MetaPropertyDecorator({alias: 'ID', size: 10, description: 'This is a ID'})
    // public id: number;
    @MetaPropertyDecorator({alias: 'ShortName', size: 10, description: 'This is a Shortname'})
    public shortname: string;
    @MetaPropertyDecorator({alias: 'Code', size: 10, description: 'This is a Code'})
    public code: string;
    @MetaPropertyDecorator({alias: 'Name', description: 'This is a Name'})
    public name: string;
    @MetaPropertyDecorator({alias: 'Description', description: 'This is a Description'})
    public description?: string;

    constructor(id: number, shortname: string, code: string, name: string, description?: string) {
        super(id);
        // this.id = id;
        this.shortname = shortname;
        this.code = code;
        this.name = name;
        this.description = description;
    }

    public toString(): string {
        return this.name;
    }
}
