import { MetaPropertyDecorator, CustomComponent, Field, CustomClassDecorator, NumberEditorOptions, NumberEditorTypes } from '../../core/decorator/meta.decorator';
import { ClassReflection } from '../reflection/reflect-class';


export interface PrimaryID {
    id: number;
}

/*
@CustomClassDecorator({
    description: 'this is a base class for dynamic component models',
    visible: false    
})
export abstract class BaseEntity implements PrimaryID {
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
*/

export function BaseEntityMetadata() {
    let baseEntityMap: ClassReflection.PropertyBaseMap<BaseEntity> = {
        id: {
            alias: 'ID',
            description: 'This is a primary key'
        }
    }
    ClassReflection.DefineMap(BaseEntity, baseEntityMap);    
}

@ClassReflection.MetadataType(BaseEntityMetadata)
export class BaseEntity implements PrimaryID {
    public id: number;
    constructor (id: number) {
        this.id = id;
    }
    public static CreateInstance() {
        new BaseEntity(0);
    }
}

export interface ToString {
    toString(): string;
}
