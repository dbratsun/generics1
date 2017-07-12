import { MetaPropertyDecorator } from '../core/decorator/meta.decorator';
import { BaseEntity} from './base.entity';


// @metaClass("This_is_a_sample_entity")
export class Unit extends BaseEntity {
    @MetaPropertyDecorator({alias: 'ShortName', size: 10, description: 'This is a Shortname'})
    public shortname: string;
    @MetaPropertyDecorator({alias: 'Name', description: 'This is a Name'})
    public name: string;
    @MetaPropertyDecorator({alias: 'Description', description: 'This is a Description'})
    public description?: string;

    constructor(id: number, shortname: string, name: string, description?: string) {
        super(id);
        this.shortname = shortname;
        this.name = name;
        this.description = description;
    }
}
