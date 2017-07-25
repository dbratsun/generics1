import { MetaPropertyDecorator, CustomComponent } from '../../core/decorator/meta.decorator';

export interface PrimaryID {
    id: number;
}

@CustomComponent('test')
export abstract class BaseEntity implements PrimaryID {
    @MetaPropertyDecorator({alias: 'ID', description: 'This is a primary key' })
    public id: number;
    constructor (id: number) {
        this.id = id;
    }
}

export interface ToString {
    toString(): string;
}
