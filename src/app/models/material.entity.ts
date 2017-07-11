import { MetaPropertyDecorator } from '../core/decorator/meta.decorator';
import { BaseEntity} from './base.entity';


// @metaClass("This_is_a_sample_entity")
export class Material extends BaseEntity {
    @MetaPropertyDecorator({alias: 'Code', size: 10, description: 'This is a Code'})
    public code: number;
    @MetaPropertyDecorator({alias: 'Name', description: 'This is a Name'})
    public name: string;
    @MetaPropertyDecorator({alias: 'Description', description: 'This is a Description'})
    public description?: string;

    constructor(id: number, code: number, name: string, description?: string) {
        super(id);
        this.code = code;
        this.name = name;
        this.description = description;
    }
}
