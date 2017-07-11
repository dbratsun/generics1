import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EditorsModule } from '../editors/editors.module';

import { DynamicDetail } from './detail.view';
import { DynamicTypeBuilder } from './type.builder';
import { DynamicTemplateBuilder } from './template.builder';

@NgModule({
    imports: [ 
        EditorsModule 
    ],
    declarations: [
        DynamicDetail,
    ],
    exports: [
        DynamicDetail,
        // DynamicTypeBuilder,
        // DynamicTemplateBuilder
    ]
})
export class DynamicModule {
    static forRoot()
    {
        return {
            ngModule: DynamicModule,
            providers: [
                DynamicTypeBuilder,
                DynamicTemplateBuilder
            ]
        }   
    }
}
