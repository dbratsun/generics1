//
// Для того чтобы вызывался декоратор по классам по которым в коде нет создания объекта
// в bundle этот класс не включается
//
import { Material } from './material.entity';

export function Dummy() {
  new Material(0,0,'','');
}
