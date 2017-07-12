import { Component, OnInit } from '@angular/core';
import { SubNavComponent } from '../sub-navbar/sub-navbar.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeItem = 0;

  headerLinks: any[] = [
    { group: 'product', link: ['/', 'product'], icon: 'home', label: 'Products' }
  ];

  subLinks: any[] = [
    { group: 'product', link: ['product/material'], label: 'Material'},
    { group: 'product', link: ['product/unit'], label: 'Unit'}
  ];

  getSubItems() {
    const _group = this.headerLinks[this.activeItem].group;
    const filtered = this.subLinks.filter(a => a.group === _group);
    return filtered;
  }

  toggleActive(item) {
    this.activeItem = this.headerLinks.findIndex(value => value.group === item.group);
  }

  ngOnInit() {
  }
}
