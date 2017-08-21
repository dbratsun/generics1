import { Unit } from '../models/unit.entity';
import { Material } from '../models/material.entity';


export const UNITS: Unit[] = [
    { id: 1, name: 'штуки', shortname: 'шт', code: 1, description: 'this is a quantity'},
    { id: 2, name: 'метры', shortname: 'м', code: 2, description: 'this is a meter'},
    { id: 3, name: 'квадратные метры', shortname: 'м2', code: 3, description: 'this is a square meter'},
    { id: 4, name: 'килограммы', shortname: 'кг', code: 4, description: 'this is a kilo'}
];

export const MATERIALS: Material[] = [
    { id: 1, code: 100100, name: 'Профиль листовой', shortname: 'профиль лист.', description: 'this is профиль листовой' /*, unit: UNITS[0] */},
    { id: 1, code: 100101, name: 'Профиль армирующий', shortname: 'профиль арм.', description: 'this is профиль армирующий' /*, unit: UNITS[2] */}    
]

