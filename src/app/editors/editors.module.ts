import { DynamicDetailComponent } from './../dynamic/detail.view';
import { NgModule } from '@angular/core'
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { StringEditorComponent } from './string-editor.component';
import { TextEditorComponent } from './text-editor.component';
import { NumberEditorComponent } from './number-editor.component';

export const DYNAMIC_DIRECTIVES = [
    forwardRef( () => StringEditorComponent),
    forwardRef( () => TextEditorComponent),
    forwardRef( () => NumberEditorComponent),
    DynamicDetailComponent
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        DYNAMIC_DIRECTIVES
    ],
    exports: [
        DYNAMIC_DIRECTIVES,
        CommonModule,
        FormsModule
    ]
})
export class EditorsModule {
    static forRoot()
    {
        return {
            ngModule: EditorsModule,
            providers: []
        }
    }
}
