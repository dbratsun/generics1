import { ClassReflection } from '../reflection/reflect-class';


export interface PrimaryID {
    id: number;
}

export interface ToString {
    toString(): string;
}

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

