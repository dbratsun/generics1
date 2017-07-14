import { ClarityStringEditorComponent } from './clarity/clarity.string-editor.component';
import { ClarityNumberEditorComponent } from './clarity/clarity.number-editor.component';
import { DynamicDetailComponent } from './../dynamic/detail.view';
import { NgModule, Renderer } from '@angular/core'
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forwardRef } from '@angular/core';
// import { StringEditorComponent } from './string-editor.component';
// import { TextEditorComponent } from './text-editor.component';
// import { NumberEditorComponent } from './number-editor.component';
import { StringEditorComponent } from './components/string-editor.component';
import { NumberEditorComponent } from './components/number-editor.component';
import { InputComponent } from './components/input-base.component';
import { LabelComponent } from './components/label-base.component';
import { PropertyEditorComponent } from './components/property-editor.component';


export const DYNAMIC_DIRECTIVES = [
    forwardRef( () => InputComponent),
    forwardRef( () => LabelComponent),
    forwardRef( () => PropertyEditorComponent),
    forwardRef( () => NumberEditorComponent),
    // forwardRef( () => TextEditorComponent),
    forwardRef( () => StringEditorComponent),
    forwardRef( () => ClarityNumberEditorComponent),
    forwardRef( () => ClarityStringEditorComponent),
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
