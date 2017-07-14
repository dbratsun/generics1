import { Component, OnInit } from '@angular/core';
import { DynamicDetailComponent } from '../../dynamic/detail.view';

import { Material } from '../../models/material.entity';


@Component({
  selector: 'app-material-edit',
  template: `
    <app-dynamic-detail [entity]="material"></app-dynamic-detail>
  `
})

export class MaterialEditComponent implements OnInit {
  material: Material;
  constructor() { }

  ngOnInit() {
    this.material = new Material(1, 1, 1234567, 'this is abc123', 'abc123', '');
  }
}

