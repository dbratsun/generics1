import { Component, OnInit } from '@angular/core';
import { DynamicDetailComponent } from '../../dynamic/detail.view';

import { Unit } from '../../core/models/unit.entity';
import { UnitOld } from '../../core/models/unit.entity.old';


@Component({
  selector: 'app-unit-edit',
  template: `
    <app-dynamic-detail [entity]="unit"></app-dynamic-detail>
  `
})

export class UnitEditComponent implements OnInit {
  unit: Unit;
  unitOld: UnitOld;
  constructor() { }

  ngOnInit() {
    this.unit = new Unit(1, 'kg', 2, 'this is a kilo', 'this is a Description');
    // this.unitOld = new UnitOld(1, 'kg', 2, 'this is a kilo', 'this is a Description');
  }
}

