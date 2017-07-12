import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-nav-item-button',
    template: `
        <a class="nib nav-link" (click)="activate.emit()">
            <i class="fa {{fa_icon}}" aria-hidden="true"></i>
        </a>
    `,
    styles: [`
        :host(:hover) {
            cursor: pointer;
        }
    `]
})
export class NavItemButtonComponent {
    @Input() fa_icon = ''; // font awesome icon
    @Output() activate = new EventEmitter();
}
