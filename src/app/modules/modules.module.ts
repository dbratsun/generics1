import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ClarityModule } from 'clarity-angular';

import { MaterialEditComponent } from './material/material-edit.component';
import { UnitEditComponent } from './unit/unit-edit.component';
import { DynamicModule } from '../dynamic/dynamic.module';

const COMPONENTS = [
    MaterialEditComponent,
    UnitEditComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DynamicModule,
    ClarityModule
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS,
  ]
})
export class ModulesModule { }

