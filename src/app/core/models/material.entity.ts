import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { BaseEntity, ToString } from './base.entity';
import { Unit } from './unit.entity';
import { ClassReflection } from '../reflection/reflect-class';

function MaterialMetadata() {
    let materialMap: ClassReflection.PropertyBaseMap<Material> = {
        name: {
            alias: 'Name',
            size: 35,
            description: 'This is a Name'
        },
        code: {
            alias: 'Code',
            size: 3,
            description: 'This is a Code',
            placeholder: 'please enter the code'
        },
        shortname: {
            alias: 'Shortname',
            size: 60,
            description: 'This is a Shortname'
        },
        description: {
            alias: 'Description',
            size: 50,
            description: 'This is a Description',
            placeholder: 'please write here a short Description'
        }

    }
    ClassReflection.DefineMap(Material, materialMap);
}

@ClassReflection.MetadataType(MaterialMetadata)
export class Material  extends BaseEntity implements ToString {
    public name: string;
    public code: number;
    public shortname: string;
    public description?: string;

    // public unit: Unit;
    // private formatedString: string;

    constructor(id: number, code: number, name: string /*, unit?: Unit */ , shortname: string, description?: string ) {
        super(id);
        // this.id = id;
        this.code = code;
        this.name = name;
        // this.unit = unit;
        this.shortname = shortname;
        this.description = description;
    }

    public static CreateInstance() {
        new Material(0,0,'','');
    }

    public toString(): string {
        return this.name;
    }
}

export function StartTest() {
    Material.CreateInstance();    
}