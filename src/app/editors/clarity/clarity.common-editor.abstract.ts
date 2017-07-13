import { CommonEditor } from '../common-editor.abstract';
import { Input } from '@angular/core';

export abstract class ClarityCommonEditor extends CommonEditor {
    @Input() public id: string;
}
