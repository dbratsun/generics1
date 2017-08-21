import { Component, OnInit } from '@angular/core';
import { DynamicDetailComponent } from '../../dynamic/detail.view';

import { Unit } from '../../core/models/unit.entity';


@Component({
  selector: 'app-unit-edit',
  template: `
    <app-dynamic-detail [entity]="unit"></app-dynamic-detail>
  `
})

export class UnitEditComponent implements OnInit {
  unit: Unit;
  constructor() { }

  ngOnInit() {
    this.unit = new Unit(1, 'kg', 2, 'this is a kilo', 'this is a Description');
  }
}

