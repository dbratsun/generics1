import { MetaPropertyDecorator } from '../core/decorator/meta.decorator';

export interface PrimaryID {
    id: number;
}

export abstract class BaseEntity implements PrimaryID {
    @MetaPropertyDecorator({alias: 'ID', description: 'This is a primary key' })
    public id: number;
    constructor (id: number) {
        this.id = id;
    }
}
