import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialEditComponent } from './modules/material/material-edit.component';
import { UnitEditComponent } from './modules/unit/unit-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/product/material', pathMatch: 'full' },
      { path: 'product', redirectTo: '/product/material', pathMatch: 'full' },
      { path: 'product/material', component: MaterialEditComponent },
      { path: 'product/unit', component: UnitEditComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }

