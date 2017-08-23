import { NgModule, Renderer } from '@angular/core'
import { Material } from './material.entity';
import { Unit } from './unit.entity';

@NgModule({
    exports: [
        Material,
        Unit
    ]
})
export class ModelsModule {}
