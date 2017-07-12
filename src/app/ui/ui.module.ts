import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClarityModule } from 'clarity-angular';

import { NavComponent } from './navbar/navbar.component';
import { SubNavComponent } from './sub-navbar/sub-navbar.component'

const COMPONENTS = [
    NavComponent,
    SubNavComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ClarityModule
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS,
  ]
})
export class UiModule { }

