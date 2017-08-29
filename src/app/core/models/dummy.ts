//
// Для того чтобы вызывался декоратор по классам по которым в коде нет создания объекта
// в bundle этот класс не включается
//
import { Material } from './material.entity';
import { BaseEntityOld } from './base.entity.old';
import { UnitOld } from './unit.entity.old';

export function Dummy() {
  new Material(0, 0, '', 0,'','');
  new BaseEntityOld(0);
  new UnitOld(0, '', 0, '');
}
