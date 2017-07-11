import { NgModule } from '@angular/core'
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { StringEditor } from './string';
import { TextEditor } from './text';
import { NumberEditor } from './number';

export const DYNAMIC_DIRECTIVES = [
    forwardRef( () => StringEditor),
    forwardRef( () => TextEditor),
    forwardRef( () => NumberEditor)
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