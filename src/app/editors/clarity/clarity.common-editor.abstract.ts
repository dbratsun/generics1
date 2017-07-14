import { CommonEditor } from '../common-editor.abstract';
import { Input } from '@angular/core';

export abstract class ClarityCommonEditor extends CommonEditor {
    @Input() public id: string;
    @Input() public placeholder: string;

    protected SetElements() {
      super.SetElements();
      if (this.placeholder) {
        this.SetElementAttribute("placeholder", this.placeholder);
      }
    }
}
