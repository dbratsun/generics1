import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

import { MetaPropertyDecorator } from '../core/decorator/meta.decorator';
import { BaseEntity} from './base.entity';


// @metaClass("This_is_a_sample_entity")
// cannot extend base class - problems with entity
export class Material extends BaseEntity {
    @MetaPropertyDecorator({alias: 'ID1', size: 3, description: 'This is a ID1'})
    public id1: number;
    @MetaPropertyDecorator({alias: 'Code', size: 3, description: 'This is a Code', placeholder: 'please enter the code'})
    public code: number;
    @MetaPropertyDecorator({alias: 'Name', size: 35, description: 'This is a Name'})
    public name: string;
    @MetaPropertyDecorator({alias: 'Shortname', size: 60, description: 'This is a Shortname'})
    public shortname: string;
    @MetaPropertyDecorator({alias: 'Description', size: 50, description: 'This is a Description', placeholder: 'please write here a short Description'})
    public description?: string;

    constructor(id: number, id1: number, code: number, name: string, shortname: string, description?: string) {
        super(id);
        this.id1 = id1;
        this.code = code;
        this.name = name;
        this.shortname = shortname;
        this.description = description;
    }
}
