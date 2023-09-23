import { Component, Input, OnInit } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { DropdownItem } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.css'],
})
export class DropdownItemComponent implements OnInit {
  @Input() item: DropdownItem = {
    svg: '',
    routerLink: '',
    component: '',
    phrase: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
