import { ClassReflection } from '../reflection/reflect-class';
import { BaseEntity, ToString } from './base.entity';

function UnitMetadata() {
    let unitMap: ClassReflection.PropertyBaseMap<Unit> = {
        shortname: {
            alias: 'Shortname',
            size: 10,
            description: 'This is a Shortname',
            placeholder: ''
        },
        code: {
            alias: 'Unitcode', 
            size: 10, 
            description: 'This is a Code',
        },
        name: {
            alias: 'Name',
            description: 'This is a Name'
        },
        description: {
            alias: 'Description',
            description: 'This is a Description'
        }
    }
    ClassReflection.DefineMap(Unit, unitMap);    
}

@ClassReflection.MetadataType(UnitMetadata)
export class Unit extends BaseEntity implements ToString  {
    public shortname: string;
    public code: number;
    public name: string;
    public description?: string;

    constructor(id: number, shortname: string, unitcode: number, name: string, description?: string) {
        super(id);
        this.shortname = shortname;
        this.code = unitcode;
        this.name = name;
        this.description = description;
    }

    public toString(): string {
        return this.shortname;
    }
}
