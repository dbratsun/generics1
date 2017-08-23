import { MetaPropertyDecorator, CustomComponent, Field, CustomClassDecorator, NumberEditorOptions, NumberEditorTypes } from '../../core/decorator/meta.decorator';

export interface PrimaryIDOld {
    id: number;
}

export interface ToStringOld {
    toString(): string;
}


@CustomClassDecorator({
    description: 'this is a base class for dynamic component models',
    visible: false    
})
export abstract class BaseEntityOld implements PrimaryIDOld {
    @Field({
        alias: 'ID',
        number_options: {
            type: NumberEditorTypes.number
        },
        description: 'This is a primary key'
    })
    public id: number;
    constructor (id: number) {
        this.id = id;
    }
}
