import { Component, OnInit } from '@angular/core';
// import { Http } from '@angular/http';
import { DynamicDetailComponent } from '../../dynamic/detail.view';

import { Material } from '../../core/models/material.entity';
import { Unit } from '../../core/models/unit.entity';

import { MockService } from '../../core/mock-backend/mock.service';
import { MaterialsService } from '../../core/mock-backend/materials.service';


@Component({
  selector: 'app-material-edit',
  template: `
    <app-dynamic-detail [entity]="material"></app-dynamic-detail>
  `
})

export class MaterialEditComponent implements OnInit {
  material: Material // = new Material(1, 1, '', /*, null,*/ '');
  materials: Material[];
  constructor(private service: MaterialsService) { }

  ngOnInit() {
    // let unit: Unit = new Unit(1, 'кг', '02', 'килограмм');
    // this.material = new Material(1, 1234567, 'this is abc123', /* null,*/ 'abc123', '');
    
    this.service.list().subscribe(
        materials => {
          // Object.assign(this.material, materials[0]);
          // let a = this.material;
          this.material = materials[0] as Material;
        }
    )
    
    // let a = this.material;
    // this.material = a;
  }
}

