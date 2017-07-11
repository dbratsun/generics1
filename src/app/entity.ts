function logType(target : any, key : string) { //: TypedPropertyDescriptor<String> {
      // var t = Reflect.getMetadata("design:type", target, key);
      // console.log(`${key} type: ${t.name}`);
      // return null;
}

function advancedLogType(info? : string) {
    return (target : any, propertyKey : string) { //: TypedPropertyDescriptor<any>=> {
        console.log(`${info} - ${target} ${propertyKey}`);
        // return null;
    }
}

// Темная сторона TypeScript — @декораторы на примерах
// https://habrahabr.ru/company/docsvision/blog/310870/

export interface IEntity {
    a: string;
    b: number;
}

export class Entity {
    @advancedLogType('Code')
    @logType
    public Code: string;
    @logType
    public Description: string;
    @logType
    public N1: number;
    @logType
    public NNNNN: number;
    constructor(
        code: string,
        description: string,
        n1: number,
        n: number) {
            this.Code = code;
            this.Description = description;
            this.N1 = n1;
            this.NNNNN = n;
         }
}

export class Entity1 {
    constructor(
        public a: string,
        public b: number
    ) { }
}
