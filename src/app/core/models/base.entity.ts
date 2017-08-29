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

export function BaseEntityLevel2Metadata() {
    let baseEntityLevel2Map: ClassReflection.PropertyBaseMap<BaseEntityLevel2> = {
        id1: {
            alias: 'ID1'
        },
        name1: {
            alias: 'Name1'
        }
    }
    ClassReflection.DefineMap(BaseEntityLevel2, baseEntityLevel2Map)
}

@ClassReflection.MetadataType(BaseEntityLevel2Metadata)
export class BaseEntityLevel2 extends BaseEntity {
    public id1: number;
    public name1: string;
    constructor(id: number, id1: number, name1: string) {
        super(id);
        this.id1 = id1;
        this.name1 = name1;
    }
}

